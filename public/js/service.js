let lastCepFetched = "";
let fetchedCep;

let sortStatus = {
    column: "",
    type: "asc",
};

function toggleLoadingState(isLoading) {
    document.getElementById("cep_input").disabled = isLoading;
    document.getElementById("status").innerHTML = isLoading
        ? "Buscando..."
        : "";
}

function toggleErrorState(isError) {
    document.getElementById("status").innerHTML = isError
        ? "CEP não existe"
        : "";
}

async function buscarCep(cep) {
    const baseUrl = "https://viacep.com.br/ws";
    lastCepFetched = cep;

    const sanitizedCep = cep.replace("-", "");
    try {
        toggleLoadingState(true);
        const response = await fetch(`${baseUrl}/${sanitizedCep}/json`, {
            method: "GET",
        });
        toggleLoadingState(false);

        const enderecoOrError = await response.json();
        if (enderecoOrError.erro) {
            toggleErrorState(true);
        } else {
            fetchedCep = enderecoOrError;
            popularEndereco(enderecoOrError);
        }
    } catch (err) {
        console.error(err);
    }
}

async function salvarEndereco() {
    const baseUrl = "http://localhost:8000/api/addresses";

    const { ddd, gia, ibge, siafi, ...validFields } = fetchedCep;
    console.log(validFields);
    const body = JSON.stringify(validFields);
    const headers = {
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers,
            body,
        });

        const enderecoOrError = await response.json();
        console.log(enderecoOrError);
    } catch (err) {
        console.error(err);
    }
}

function popularEndereco(json) {
    const fieldsIds = [
        "cep",
        "logradouro",
        "complemento",
        "bairro",
        "localidade",
        "uf",
    ];

    fieldsIds.forEach((field) => {
        const span = document.getElementById(field);
        span.innerHTML = json[field] || "--";
    });
}

function popularCampos(json) {
    const table = document.getElementById("testBody");

    let row = table.insertRow();
    let cep = row.insertCell(0);
    cep.innerHTML = json.cep;
    let logradouro = row.insertCell(1);
    logradouro.innerHTML = json.logradouro;
}

const handleZipCode = (event) => {
    let input = event.target;
    toggleErrorState(false);
    input.value = zipCodeMask(input.value);
};

const zipCodeMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    if (value.length == 9 && value !== lastCepFetched) {
        buscarCep(value);
    }
    return value;
};

const clearColumnStatus = () => {
    const columnId = sortStatus.column;
    if (!!sortStatus.column) {
        const [arrowUpEl, arrowDownEl] = document
            .getElementById(columnId)
            .getElementsByClassName("arrows");
        if (sortStatus.type === "asc") {
            arrowUpEl.classList.toggle("arrow_disabled");
        } else {
            arrowUpEl.classList.toggle("arrow_hidden");
            arrowDownEl.classList.toggle("arrow_hidden");
        }
    }
};

const orderByColumn = (event) => {
    event.stopPropagation();

    const columnId = event.target.id;
    console.log(columnId);
    const [arrowUpEl, arrowDownEl] =
        event.target.getElementsByClassName("arrows");

    if (columnId === sortStatus.column) {
        if (sortStatus.type === "asc") {
            sortStatus.type = "desc";

            arrowUpEl.classList.toggle("arrow_disabled");
            arrowUpEl.classList.toggle("arrow_hidden");
            arrowDownEl.classList.toggle("arrow_hidden");
        } else {
            sortStatus.type = "asc";
            sortStatus.column = "";
            arrowUpEl.classList.toggle("arrow_hidden");
            arrowDownEl.classList.toggle("arrow_hidden");
        }
    } else {
        clearColumnStatus();
        sortStatus.column = columnId;
        sortStatus.type = "asc";

        arrowUpEl.classList.toggle("arrow_disabled");
    }
};
