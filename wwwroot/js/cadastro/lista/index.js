let reabilitacao = [];

window.addEventListener('load', async function () {
    getTodosCadastros();

    //adicionarValoresEmTable(cadastros);
})

function adicionarValoresEmTable(data) {
    data.forEach(x => {
        setTableHtml(x)
    })
}

function setTableHtml(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = document.createElement('tr');

    let reabilitacacaoDetalhe;

    if (data.deficienteFazPositivo !== undefined && data.deficienteFazPositivo !== null) {
        reabilitacacaoDetalhe = `
            <ul>
                ${data.deficienteFazPositivo.map(x => `
                    <li>Profissional: ${x.profissional} Tipo de Instituição: ${x.tipoInstituicao}</li>
                    <li>Instituição: ${x.instituicao} Outro Município: ${x.outroMunicipio}</li>
                `)}
            </ul>
        `
    } else {
        reabilitacacaoDetalhe = ""
    }

    newRow.innerHTML = `
            <td class="border border-dark">${data.cpf}</td>
            <td class="border border-dark">${data.nome}</td>
            <td class="border border-dark">${data.dataNascimento}</td>
            <td class="border border-dark">${data.deficienteEmDomicilio}</td>
            <td class="border border-dark">${data.deficientePossuiLaudo}</td>
            <td class="border border-dark">${data.descritivoLaudo}</td>
            <td class="border border-dark">${data.deficientePossuiQualDeficiencia}</td>
            <td class="border border-dark">${data.deficienteFazReabilitacao}</td>
            <td class="border border-dark">${reabilitacacaoDetalhe}</td>
        `;

    tableBody.appendChild(newRow);
}

function getTodosCadastros() {
    var request = db.transaction(["deficientes"], "readwrite").objectStore("deficientes").getAll();
    request.onsuccess = function (event) {
        console.log(request.result);
        adicionarValoresEmTable(request.result);
    };
}