


const deficienteEmDomicilio = document.querySelector('#DeficienteEmDomicilio');

deficienteEmDomicilio.addEventListener('change', () => {
    const escolha = deficienteEmDomicilio.value

    if (escolha == 2) {
        document.querySelector('.form__deciente__true').style.display = 'block'
        document.querySelector('.form__deciente__false').style.display = 'none'
    } else if (escolha == 1) {
        document.querySelector('.form__deciente__true').style.display = 'none'
        document.querySelector('.form__deciente__false').style.display = 'block'
    } else {
        document.querySelector('.form__deciente__true').style.display = 'none'
        document.querySelector('.form__deciente__false').style.display = 'none'
    }
});

const deficientePossuiLaudo = document.querySelector('#DeficientePossuiLaudo');

deficientePossuiLaudo.addEventListener('change', () => {
    const escolhaDeficientePossuiLaudo = deficientePossuiLaudo.value
    const inputDeficienteDescritivoLaudo = document.querySelector('.form__deficiente__descritivo__laudo');
    const inputDeficienteQualDeficiente = document.querySelector('.form__deficiente__qual__deficiencia');

    if (escolhaDeficientePossuiLaudo == 1) {
        inputDeficienteDescritivoLaudo.style.display = 'none'
        inputDeficienteQualDeficiente.style.display = 'block'
    } else if (escolhaDeficientePossuiLaudo != 1) {
        inputDeficienteDescritivoLaudo.style.display = 'block'
        inputDeficienteQualDeficiente.style.display = 'none'
    } else {
        inputDeficienteDescritivoLaudo.style.display = 'none'
        inputDeficienteQualDeficiente.style.display = 'none'
    }
});

const deficienteFazReabilitacao = document.querySelector('#DeficienteFazReabilitacao');

deficienteFazReabilitacao.addEventListener('change', () => {
    const escolhadeficienteFazReabilitacao = deficienteFazReabilitacao.value
    const inputDeficienteFazReabilitacao = document.querySelector('.form__deficiente__faz__reabilitacao__true');

    if (escolhadeficienteFazReabilitacao == 1) {
        inputDeficienteFazReabilitacao.style.display = 'none';
    } else if (escolhadeficienteFazReabilitacao == 2) {
        inputDeficienteFazReabilitacao.style.display = 'block';
    } else {
        inputDeficienteFazReabilitacao.style.display = 'none';
    }
});

const deficienteFazReabilitacaoEmQualReabilitacao = document.querySelector('#DeficienteFazReabilitacaoEmQualReabilitacao');

deficienteFazReabilitacaoEmQualReabilitacao.addEventListener('change', () => {
    const escolhadeficienteFazReabilitacao = deficienteFazReabilitacaoEmQualReabilitacao.value
    const inputDeficienteFazReabilitacaoEmQualReabilitacaoOutro = document.querySelector('.form__deficiente_faz__reabilitacao__em__qual__reabilitacao__outro');

    if (escolhadeficienteFazReabilitacao == 13) {
        inputDeficienteFazReabilitacaoEmQualReabilitacaoOutro.style.display = 'block';
    } else {
        inputDeficienteFazReabilitacaoEmQualReabilitacaoOutro.style.display = 'none';
    }
});

let reabilitacao = [];
document.getElementById('addDataBtn').addEventListener('click', function () {
    // Capturando os valores dos campos
    const profissional = document.getElementById('DeficienteFazReabilitacaoComQualProfissional').options[document.getElementById('DeficienteFazReabilitacaoComQualProfissional').selectedIndex].text;
    const tipoInstituicao = document.getElementById('DeficienteFazReabilitacaoQualTipoInstituicao').options[document.getElementById('DeficienteFazReabilitacaoQualTipoInstituicao').selectedIndex].text;
    const instituicao = document.getElementById('DeficienteFazReabilitacaoEmQualReabilitacao').options[document.getElementById('DeficienteFazReabilitacaoEmQualReabilitacao').selectedIndex].text;
    const outroMunicipio = document.getElementById('DeficienteFazReabilitacaoEmOutroMunicipio').options[document.getElementById('DeficienteFazReabilitacaoEmOutroMunicipio').selectedIndex].text;

    // Criando uma nova linha na tabela
    const tableBody = document.querySelector('#dataTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
            <td>${profissional}</td>
            <td>${tipoInstituicao}</td>
            <td>${instituicao}</td>
            <td>${outroMunicipio}</td>
        `;

    reabilitacao.push({
        profissional,
        tipoInstituicao,
        instituicao,
        outroMunicipio
    })

    // Adicionando a nova linha na tabela
    tableBody.appendChild(newRow);

    // Fechando a modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();
});

document.getElementById("CadastrarDeficiente").addEventListener('click', function () {
    const Nome = document.querySelector("#Nome");
    const Cpf = document.querySelector("#CPF");
    const DataNascimento = document.querySelector("#DataNascimento");
    const DeficienteEmDomicilio = document.querySelector("#DeficienteEmDomicilio").options[document.getElementById('DeficienteEmDomicilio').selectedIndex].text;
    const DeficientePossuiLaudo = document.querySelector("#DeficientePossuiLaudo").options[document.getElementById('DeficientePossuiLaudo').selectedIndex].text;
    const DescritivoLaudo = document.querySelector("#DescritivoLaudo");
    const DeficientePossuiQualDeficiencia = document.querySelector("#DeficientePossuiQualDeficiencia").options[document.getElementById('DeficientePossuiQualDeficiencia').selectedIndex].text;
    const DeficienteFazReabilitacaoValue = document.querySelector("#DeficienteFazReabilitacao").value;
    const DeficienteFazReabilitacaoText = document.querySelector("#DeficienteFazReabilitacao").options[document.getElementById('DeficienteFazReabilitacao').selectedIndex].text;

    let reabilitacoes;
    if (DeficienteFazReabilitacaoValue == 2) {
        reabilitacoes = reabilitacao;
    }

    const data = {
        cpf: Cpf.value,
        nome: Nome.value,
        dataNascimento: DataNascimento.value,
        deficienteEmDomicilio: DeficienteEmDomicilio,
        deficientePossuiLaudo: DeficientePossuiLaudo,
        descritivoLaudo: DescritivoLaudo.value,
        deficientePossuiQualDeficiencia: DeficientePossuiQualDeficiencia,
        deficienteFazReabilitacao: DeficienteFazReabilitacaoText,
        deficienteFazPositivo: reabilitacoes
    }
    console.log(JSON.stringify(data));
    cadastrarDeficiente(data)
});

function cadastrarDeficiente(obj) {
    var transaction = db.transaction(["deficientes"], "readwrite");
    transaction.oncomplete = function (event) {
        console.log("Sucesso :)");
        window.location.href = '/Deficiente/Lista'
    };
    transaction.onerror = function (event) {
        console.log("Erro :(");
    };
    var objectStore = transaction.objectStore("deficientes");
    objectStore.add(obj);
}