const CACHE_NAME = 'regula-mente-v2';
const ARQUIVOS_CACHE = [
    './',
    './index.html',
    './principal.html',
    './acoes_amarela.html',
    './acoes_azul.html',
    './acoes_verde.html',
    './acoes_vermelha.html',
    './app.js',
    './manifest.json',
    './imagens/icones/cachorro.png',
    './imagens/icones/foguete.png',
    './imagens/icones/gato.png',
    './imagens/icones/grafico-preditivo.png',
    './imagens/icones/leao.png',
    './imagens/icones/mascara-alienigena.png',
    './imagens/icones/sapo.png',
    './imagens/icones/seta-para-a-esquerda.png',
    './imagens/icones/usuario.png'
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
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
