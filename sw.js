const CACHE_NAME = 'regula-mente-v5';
const ARQUIVOS_CACHE = [
    './',
    'index.html',
    'principal.html',
    'acoes_amarela.html',
    'acoes_azul.html',
    'acoes_verde.html',
    'acoes_vermelha.html',
    'app.js',
    'manifest.json',
    'imagens/icone.png',
    'imagens/icone512.png',
    'imagens/icones/cachorro.png',
    'imagens/icones/foguete.png',
    'imagens/icones/gato.png',
    'imagens/icones/grafico-preditivo.png',
    'imagens/icones/leao.png',
    'imagens/icones/mascara-alienigena.png',
    'imagens/icones/sapo.png',
    'imagens/icones/seta-para-a-esquerda.png',
    'imagens/icones/usuario.png',
    'imagens/zona_amarela/apertar.png',
    'imagens/zona_amarela/beber.png',
    'imagens/zona_amarela/botao_de_pausa.png',
    'imagens/zona_amarela/brinquedo.png',
    'imagens/zona_amarela/caminhar.png',
    'imagens/zona_amarela/contar.png',
    'imagens/zona_azul/ajuda.png',
    'imagens/zona_azul/beber.png',
    'imagens/zona_azul/caminhar.png',
    'imagens/zona_azul/descansar.png',
    'imagens/zona_azul/desenhar.png',
    'imagens/zona_azul/ouvir_musica.png',
    'imagens/zona_verde/atividade.png',
    'imagens/zona_verde/brincar.png',
    'imagens/zona_verde/comer.png',
    'imagens/zona_verde/jogar_no_tablet.png',
    'imagens/zona_verde/ler.png',
    'imagens/zona_verde/professor.png',
    'imagens/zona_vermelha/contar.png',
    'imagens/zona_vermelha/parar.png',
    'imagens/zona_vermelha/respirar.png',
    'imagens/zona_vermelha/sair.png',
    'imagens/zona_vermelha/silencio.png',
    'imagens/zona_vermelha/sozinho.png',
    'audios/pizza/zona_amarela.m4a',
    'audios/pizza/zona_azul.m4a',
    'audios/pizza/zona_verde.m4a',
    'audios/pizza/zona_vermelha.m4a',
    'audios/zona_amarela/agua.m4a',
    'audios/zona_amarela/apertar.m4a',
    'audios/zona_amarela/brinquedo.m4a',
    'audios/zona_amarela/caminhar.m4a',
    'audios/zona_amarela/contar.m4a',
    'audios/zona_amarela/pausa.m4a',
    'audios/zona_azul/agua.m4a',
    'audios/zona_azul/ajuda.m4a',
    'audios/zona_azul/caminhar.m4a',
    'audios/zona_azul/descansar.m4a',
    'audios/zona_azul/desenhar.m4a',
    'audios/zona_azul/musica.m4a',
    'audios/zona_verde/ajudar_professor.m4a',
    'audios/zona_verde/brincar.m4a',
    'audios/zona_verde/comer_algo.m4a',
    'audios/zona_verde/jogar_tablet.m4a',
    'audios/zona_verde/ler_livro.m4a',
    'audios/zona_verde/tarefa.m4a',
    'audios/zona_vermelha/contar.m4a',
    'audios/zona_vermelha/parar.m4a',
    'audios/zona_vermelha/respirar.m4a',
    'audios/zona_vermelha/sair.m4a',
    'audios/zona_vermelha/silencio.m4a',
    'audios/zona_vermelha/sozinho.m4a'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ARQUIVOS_CACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((nomes) => Promise.all(
                nomes
                    .filter((nome) => nome !== CACHE_NAME)
                    .map((nome) => caches.delete(nome))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.headers.has('range')) {
        event.respondWith(
            fetch(event.request).catch(() => responderDoCacheComRange(event.request))
        );
        return;
    }

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});

async function responderDoCacheComRange(request) {
    const respostaCache = await caches.match(request);
    if (!respostaCache) {
        return Response.error();
    }

    const range = request.headers.get('range');
    const partes = /^bytes=(\d*)-(\d*)$/.exec(range || '');
    if (!partes) {
        return respostaCache;
    }

    const blob = await respostaCache.blob();
    const bytesInicio = partes[1] ? Number(partes[1]) : null;
    const bytesFim = partes[2] ? Number(partes[2]) : null;
    const inicio = bytesInicio !== null ? bytesInicio : Math.max(blob.size - (bytesFim || blob.size), 0);
    const fim = bytesInicio === null ? blob.size - 1 : (bytesFim !== null ? bytesFim : blob.size - 1);
    const pedaco = blob.slice(inicio, fim + 1);

    return new Response(pedaco, {
        status: 206,
        statusText: 'Partial Content',
        headers: {
            'Accept-Ranges': 'bytes',
            'Content-Length': String(pedaco.size),
            'Content-Range': `bytes ${inicio}-${fim}/${blob.size}`,
            'Content-Type': respostaCache.headers.get('Content-Type') || 'audio/mp4'
        }
    });
}
