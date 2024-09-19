const CACHE_NAME = 'cadastro-deficientes-cache-v1';

// Arquivos para cachear
const urlsToCache = [
    '/',
    '/css/site.css', // Inclua o caminho para seus arquivos CSS e JS
    '/js/site.js',
    '/sw.js',
    '/images/logo.png',
    'https://localhost:44394/Deficiente/Cadastro',
    //'/Deficiente/Lista',
];

// Instalando o Service Worker e cacheando os recursos
self.addEventListener('install', event => {
    //console.log('event reqeuqest', event.request);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                await cache.addAll(urlsToCache);
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