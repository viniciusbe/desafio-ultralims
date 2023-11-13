let lastZipCodeFetched = "";

const addressKeys = [
    "zipCode",
    "street",
    "complement",
    "neighborhood",
    "city",
    "state",
];

window.onload = () => {
    document.getElementById("zip_code_input").focus();
    fetchData();
};

const fetchData = async () => {
    const queryParams = `order_by=${sortStatus.column}&order_type=${sortStatus.type}`;
    try {
        setLoadingTable();
        const response = await fetch(
            `http://localhost:8000/api/addresses?${queryParams}`
        );

        const addresses = await response.json();

        if (addresses.length === 0) {
            setNoDataTable();
        } else {
            updateTableAddresses(addresses);
        }
    } catch (err) {
        console.error(err);
    }
};
