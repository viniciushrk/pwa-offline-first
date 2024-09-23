// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function (registration) {
            console.log('Service Worker registrado com sucesso:', registration);

            // Verificar se existe um novo service worker esperando para ser ativado
            //registration.onupdatefound = function () {
            //    const installingWorker = registration.installing;
            //    installingWorker.onstatechange = function () {
            //        if (installingWorker.state === 'installed') {
            //            //if (navigator.serviceWorker.controller) {
            //            //    // Nova versão detectada, mostrar o botão para atualizar
            //            //    console.log('Nova versão do Service Worker disponível.');

            //            //    const updateButton = document.getElementById('updateButton');
            //            //    updateButton.style.display = 'block';

            //            //    updateButton.addEventListener('click', function () {
            //            //        // Atualiza o Service Worker forçando a ativação da nova versão
            //            //        installingWorker.postMessage({ action: 'skipWaiting' });
            //            //    });
            //            //}

            //            //if (navigator.serviceWorker.controller) {
            //            //    // Novo Service Worker está disponível e aguardando atualização
            //            //    showUpdateNotification();
            //            //} else {
            //            //    // SW instalado pela primeira vez
            //            //    console.log('Service Worker instalado pela primeira vez.');
            //            //}
            //        }
            //    };
            //};
        })
        .catch(function (error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });

    // Escutar a ativação do novo Service Worker e recarregar a página
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    });
}


// Função para mostrar notificação de atualização
function showUpdateNotification() {
    const updateBar = document.createElement('div');
    updateBar.id = 'update-bar';
    updateBar.style.position = 'fixed';
    updateBar.style.bottom = '0';
    updateBar.style.width = '100%';
    updateBar.style.backgroundColor = '#333';
    updateBar.style.color = 'white';
    updateBar.style.padding = '10px';
    updateBar.style.textAlign = 'center';
    updateBar.innerHTML = `
      <p>Uma nova versão está disponível. <button onclick="updateServiceWorker()">Atualizar</button></p>
    `;
    document.body.appendChild(updateBar);
}

// Função para atualizar o Service Worker
function updateServiceWorker() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ action: 'skipWaiting' });
            }
        });
    }
}

