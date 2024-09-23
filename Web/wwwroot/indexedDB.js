window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var request, db;
if (!window.indexedDB) {
    console.log("Seu navegador não suporta o recurso HTML5 IndexedDB");
} else {
    request = window.indexedDB.open("CadastroDeficiente", 2);
    request.onerror = function (event) {
        console.log("Erro ao abrir o banco de dados", event);
    }

    request.onupgradeneeded = function (event) {
        console.log("Atualizando");
        db = event.target.result;
        var objectStore = db.createObjectStore("deficientes", { keyPath: "cpf" });
    };
    request.onsuccess = function (event) {
        console.log("Banco de dados aberto com sucesso");
        db = event.target.result;
    }
}