const CACHE_NAME = 'cadastro-deficientes-cache-v1';

// Arquivos para cachear
const urlsToCache = [
    '/',
    '/css/site.css', // Inclua o caminho para seus arquivos CSS e JS
    '/css/cadastro/style.css', // Inclua o caminho para seus arquivos CSS e JS
    '/js/site.js',
    '/js/cadastro/index.js',
    '/js/cadastro/lista/index.js',
    '/indexedDB.js',
    '/sw.js',
    '/images/logo.png',
    '/Deficiente/Cadastro',
    '/Deficiente/Lista',
];

// Instalando o Service Worker e cacheando os recursos
self.addEventListener('install', event => {
    //console.log('event reqeuqest', event.request);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(urlsToCache);
                console.log('Arquivos cacheados com sucesso!');
            })
    );
});

// Intercepta requisições de rede e responde com recursos do cache quando disponíveis
self.addEventListener('fetch', (event) =>  {
    console.log('event request', event.request);
    event.respondWith(
        caches.match(event.request)
         .then(cacheResponse => (cacheResponse || fetch(event.request))),
    );
});


// Atualizando o Service Worker e limpando caches antigos
self.addEventListener('activate', function (event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting(); // Força o service worker a ativar imediatamente
    }
});