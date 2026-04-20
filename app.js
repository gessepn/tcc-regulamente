// banco de dados salvo no navegador
const chaveBD = "regula_dados_tcc";

function pegarDados() {
    let salva = localStorage.getItem(chaveBD);
    if (salva) {
        return JSON.parse(salva);
    }
    
    // se nao tiver nada salva, cria a estrutura inicial
    let objBase = {
        zonas: {
            "Verde": 0,
            "Amarela": 0,
            "Azul": 0,
            "Vermelha": 0
        },
        estrategias: {}, 
        alunos: {} 
    };
    return objBase;
}

function salvarDados(obj) {
    localStorage.setItem(chaveBD, JSON.stringify(obj));
}

function getAlunoLogado() {
    let user = localStorage.getItem("usuarioAtual");
    if (!user) {
        return "Convidado";
    }
    return user;
}

// ========== FUNÇÕES DE SEGURANÇA E INSTALAÇÃO ==========

// Sistema de PIN para o Mediador
const RegulaMenteApp = {
    promptForMediatorPin() {
        const pin = prompt("Digite o PIN de acesso do mediador:");
        return pin === "1234"; // Você pode mudar esse PIN aqui
    }
};
window.RegulaMenteApp = RegulaMenteApp;

// Registro do Service Worker para permitir "Instalar" no Tablet
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA: Pronto para instalação!', reg))
            .catch(err => console.log('PWA: Erro no registro', err));
    });
}

// ========== FUNCOES PRINCIPAIS DE REGISTRO ==========

// chama quando a crianca clica num botao de cor (Pizza)
function registrarAcessoZona(corClicada) {
    let bd = pegarDados();
    let nomeAluno = getAlunoLogado();

    // aumenta contagem global
    if (bd.zonas[corClicada] !== undefined) {
        bd.zonas[corClicada] = bd.zonas[corClicada] + 1;
    }

    // historico individual
    if (!bd.alunos[nomeAluno]) {
        bd.alunos[nomeAluno] = {
            cliquesTotais: 0,
            cores: {}
        };
    }
    
    bd.alunos[nomeAluno].cliquesTotais++;
    
    if (!bd.alunos[nomeAluno].cores[corClicada]) {
        bd.alunos[nomeAluno].cores[corClicada] = 0;
    }
    bd.alunos[nomeAluno].cores[corClicada]++;

    salvarDados(bd);
}

// chama quando a crianca escolhe uma acao tipo beber agua
function registrarUsoEstrategia(nomeAcao) {
    let bd = pegarDados();
    
    if (!bd.estrategias[nomeAcao]) {
        bd.estrategias[nomeAcao] = 0;
    }
    bd.estrategias[nomeAcao]++;
    
    salvarDados(bd);
}

// botao de reset
function apagarHeatmap() {
    if(confirm("Tem certeza que deseja zerar todos os dados do TCC?")) {
        localStorage.removeItem(chaveBD);
        location.reload();
    }
}

// ========== MONTAGEM DOS GRÁFICOS (ÁREA OCULTA) ==========

function desenharGraficosTCC() {
    let bd = pegarDados();
    
    // 1. grafico de zonas
    let totalZonas = 0;
    for (let c in bd.zonas) {
        totalZonas += bd.zonas[c];
    }

    let divGraficoZonas = document.getElementById("grafico-zonas");
    if (!divGraficoZonas) return;
    
    if (totalZonas === 0) {
        divGraficoZonas.innerHTML = `<p style="color: #a0aec0; font-size: 14px;">Sem dados pra mostrar ainda.</p>`;
    } else {
        let htmlFinalZonas = "";
        for (let zona in bd.zonas) {
            let valor = bd.zonas[zona];
            let calc = (valor / totalZonas) * 100;
            let porcentagem = calc.toFixed(0);
            
            let classeCss = `zona-${zona.toLowerCase()}`;
            
            htmlFinalZonas += `
            <div class="heatmap-row ${classeCss}">
                <span class="heatmap-label">Zona ${zona}</span>
                <div class="heatmap-bar">
                    <div class="heatmap-fill" style="width: ${porcentagem}%;"></div>
                </div>
                <span class="heatmap-value">${porcentagem}% (${valor})</span>
            </div>`;
        }
        divGraficoZonas.innerHTML = htmlFinalZonas;
    }

    // 2. grafico de acoes
    let divGraficoAcoes = document.getElementById("grafico-estrategias");
    if (divGraficoAcoes) {
        let acoesArray = [];
        for(let acao in bd.estrategias) {
            acoesArray.push({ nome: acao, qtd: bd.estrategias[acao] });
        }
        acoesArray.sort((a, b) => b.qtd - a.qtd);

        if (acoesArray.length === 0) {
            divGraficoAcoes.innerHTML = `<p style="color: #a0aec0; font-size: 14px;">Nenhuma ação registrada.</p>`;
        } else {
            let htmlAcoes = "";
            let maxCliques = acoesArray[0].qtd; 
            for(let obj of acoesArray) {
                let percentualBarra = ((obj.qtd / maxCliques) * 100).toFixed(0);
                htmlAcoes += `
                <div class="heatmap-row" style="grid-template-columns: 150px 1fr 30px;">
                    <span class="heatmap-label" style="font-size: 13px;">${obj.nome}</span>
                    <div class="heatmap-bar" style="background:#edf2f7; height:8px;">
                        <div class="heatmap-fill" style="background:#718096; width: ${percentualBarra}%;"></div>
                    </div>
                    <span class="heatmap-value">${obj.qtd}</span>
                </div>`;
            }
            divGraficoAcoes.innerHTML = htmlAcoes;
        }
    }

    // 3. tabela da turma
    let tabela = document.getElementById("tabela-alunos");
    if (tabela) {
        let nomesAlunos = Object.keys(bd.alunos);
        if (nomesAlunos.length === 0) {
            tabela.innerHTML = `<tr><td colspan="3" style="text-align:center; color: #a0aec0;">Tabela vazia.</td></tr>`;
        } else {
            let htmlTabela = "";
            for(let n of nomesAlunos) {
                let info = bd.alunos[n];
                let corVencedora = "Nenhuma";
                let recorde = 0;
                for (let c in info.cores) {
                    if (info.cores[c] > recorde) {
                        recorde = info.cores[c];
                        corVencedora = c;
                    }
                }
                htmlTabela += `
                <tr>
                    <td style="font-weight: bold; color: #2d3748;">${n}</td>
                    <td>${info.cliquesTotais} interações</td>
                    <td><span style="background: #edf2f7; padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: bold;">Zona ${corVencedora}</span></td>
                </tr>`;
            }
            tabela.innerHTML = htmlTabela;
        }
    }
}