const updateTableAddresses = (addresses) => {
    const newBodyEl = createTableBody();
    addresses.forEach((address) => insertDataRow(newBodyEl, address));

    replaceTableBody(newBodyEl);
};

const insertDataRow = (tbodyEl, address) => {
    let row = tbodyEl.insertRow();

    addressKeys.forEach((key, index) => {
        let data = row.insertCell(index);
        data.innerHTML = address[key] || "--";
    });
};

const setLoadingTable = () => {
    setMessageTable("Carregando...");
};

const setNoDataTable = () => {
    setMessageTable("Sem endereços salvos ainda...");
};

const setMessageTable = (message) => {
    const newBodyEl = createTableBody();

    let row = newBodyEl.insertRow();
    let data = row.insertCell(0);
    data.colSpan = 6;
    data.innerHTML = message;

    replaceTableBody(newBodyEl);
};

const createTableBody = () => {
    const newBodyEl = document.createElement("tbody");
    newBodyEl.id = "table_body";
    return newBodyEl;
};

const replaceTableBody = (newBodyEl) => {
    const oldBodyEl = document.getElementById("table_body");
    oldBodyEl.parentNode.replaceChild(newBodyEl, oldBodyEl);
};
