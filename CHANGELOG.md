# Changelog

Registro simplificado das principais etapas de desenvolvimento do RegulaMente.

## Versão 1.0.2 (Correção dos áudios das estratégias)

Correções aplicadas nas telas de estratégias para melhorar a reprodução dos áudios no app que não estavam carregando direito:

* inclusão dos arquivos de áudio das estratégias no cache do Service Worker;
* atualização do cache para `regula-mente-v7`, forçando a instalação da nova versão nos dispositivos;
* suporte a requisições parciais de áudio (`Range`) no Service Worker, melhorando a reprodução em modo PWA/offline;
* padronização dos nomes dos arquivos de áudio em letras minúsculas para evitar erro 404 no GitHub Pages;
* ajuste da navegação da tela principal para aguardar o fim do áudio da zona antes de abrir as estratégias;
* melhoria no log de erro da reprodução de áudio, exibindo o caminho do arquivo que falhar.

## Versão 1.0.1 (Atualização técnica, correção de cache e design)

Ajustes de infraestrutura da aplicação aplicados na hospedagem atual que passou do netlify para o github pages:

* Correção no Service Worker: Ajuste nos caminhos relativos do array `ARQUIVOS_CACHE` para evitar falhas atômicas no método `cache.addAll()`, garantindo o funcionamento offline do app shell (antes ele não armazenava o conteúdo e não funcionava offline);
* Inclusão de dependências no cache: Adicionados os ícones principais (`icone.png` e `icone512.png`) referenciados no `manifest.json` à lista de arquivos cacheados;
* Otimização de Design do Ícone: Substituição dos arquivos de imagem por versões mascaráveis com cantos retos e fundo plano, eliminando o erro visual de dupla borda ("quadrado dentro de quadrado") na interface nativa de tablets;
* Atualização de versão do cache: `CACHE_NAME` alterado para `regula-mente-v4` para forçar os navegadores e dispositivos em modo totem a reinstalarem o Service Worker atualizado, limpando de forma definitiva os bugs de cache das versões anteriores (`v2` e `v3`).


## Versão revisada pós-avaliação

Alterações realizadas após a avaliação por especialistas:

* refinamento da representação visual das emoções;
* revisão das legendas associadas às zonas emocionais;
* padronização de elementos visuais da interface;
* ajustes na temporização dos áudios;
* melhoria no retorno automático após a escolha das estratégias;
* correção de comportamentos relacionados à reprodução de áudio;
* melhoria da consistência entre a tela principal e as telas internas.

## Versão avaliada por especialistas

Principais recursos presentes na versão submetida à avaliação:

* tela principal com quadruplicidade de zonas emocionais;
* telas de estratégias para as zonas verde, azul, amarela e vermelha;
* uso de pictogramas ARASAAC;
* textos curtos associados às imagens;
* feedback visual e auditivo;
* registro local das interações com LocalStorage;
* painel demonstrativo com frequência por zona emocional;
* ranking de estratégias mais acessadas;
* histórico básico por perfil;
* funcionamento como PWA;
* operação offline sem dependência de servidor externo.

## Fase inicial de desenvolvimento

Decisões iniciais de desenvolvimento:

* definição do problema de pesquisa;
* escolha do público-alvo;
* levantamento de requisitos com base no TEA, nas Zonas de Regulação e no Modelo GAIA;
* definição da arquitetura PWA;
* escolha por armazenamento local;
* organização da interface em fluxo simples e previsível;
* implementação inicial em HTML5, CSS3 e JavaScript.
