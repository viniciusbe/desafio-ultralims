const addAddressToTable = (address) => {
    const bodyEl = document.getElementById("table_body");
    insertDataRow(bodyEl, address);
};

const updateTableAddresses = (addresses) => {
    const newBodyEl = document.createElement("tbody");
    newBodyEl.id = "table_body";
    addresses.forEach((address) => insertDataRow(newBodyEl, address));

    const oldBodyEl = document.getElementById("table_body");
    oldBodyEl.parentNode.replaceChild(newBodyEl, oldBodyEl);
};

const insertDataRow = (tbodyEl, address) => {
    let row = tbodyEl.insertRow();

    adressKeys.forEach((key, index) => {
        let data = row.insertCell(index);
        data.innerHTML = address[key];
    });
};
