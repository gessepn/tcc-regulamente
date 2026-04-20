// Service Worker básico para permitir a instalação do PWA
const CACHE_NAME = 'regula-mente-v1';

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Instalado');
});

self.addEventListener('fetch', (e) => {
    // Apenas repassa as requisições para o servidor
    e.respondWith(fetch(e.request));
});