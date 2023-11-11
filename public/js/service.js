let lastZipCodeFetched = "";

let sortStatus = {
    column: "",
    type: "asc",
};

const adressKeys = [
    "zipCode",
    "street",
    "complement",
    "neighborhood",
    "city",
    "state",
];

window.onload = () => {
    fetchData();
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

const clearColumnStatus = () => {
    const columnId = sortStatus.column;
    console.log(sortStatus.column);
    if (sortStatus.column != "") {
        const [arrowUpEl, arrowDownEl] = document
            .getElementById(columnId)
            .getElementsByClassName("arrows");

        console.log(document.getElementById(columnId));
        if (sortStatus.type === "asc") {
            arrowUpEl.classList.toggle("arrow_disabled");
        } else {
            arrowUpEl.classList.toggle("arrow_hidden");
            arrowDownEl.classList.toggle("arrow_hidden");
        }
    }
};

const fetchData = async () => {
    const queryParams = `order_by=${sortStatus.column}&order_type=${sortStatus.type}`;
    try {
        const response = await fetch(
            `http://localhost:8000/api/addresses?${queryParams}`
        );
        const adresses = await response.json();

        updateTableAddresses(adresses);
    } catch (err) {
        console.error(err);
    }
};

const handleOrderBy = (event) => {
    event.stopPropagation();

    const columnId = event.target.id;

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
        console.log("object");
        clearColumnStatus();
        sortStatus.column = columnId;
        sortStatus.type = "asc";

        arrowUpEl.classList.toggle("arrow_disabled");
    }

    fetchData();
};
