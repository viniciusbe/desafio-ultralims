let fetchedZipCode;

async function fetchZipCode(zipCode) {
    const baseUrl = "https://viacep.com.br/ws";
    lastZipCodeFetched = zipCode;

    const sanitizedZipCode = zipCode.replace("-", "");
    try {
        toggleLoadingState(true);
        const response = await fetch(`${baseUrl}/${sanitizedZipCode}/json`, {
            method: "GET",
        });
        toggleLoadingState(false);

        const addressOrError = await response.json();
        if (addressOrError.erro) {
            toggleErrorState(true);
        } else {
            const mappedAddres = {
                zipCode: addressOrError.cep,
                street: addressOrError.logradouro,
                complement: addressOrError.complemento,
                neighborhood: addressOrError.bairro,
                city: addressOrError.localidade,
                state: addressOrError.uf,
            };

            fetchedZipCode = mappedAddres;
            showAddress(mappedAddres);
        }
    } catch (err) {
        console.error(err);
    }
}

function showAddress(fetchedAddress) {
    const fieldsIds = [
        "fetched_zip_code",
        "fetched_street",
        "fetched_complement",
        "fetched_neighborhood",
        "fetched_city",
        "fetched_state",
    ];

    fieldsIds.forEach((field, index) => {
        const spanEl = document.getElementById(field);

        const curAddressKey = adressKeys[index];
        spanEl.innerHTML = fetchedAddress[curAddressKey] || "--";
    });
}

async function saveAddress() {
    const baseUrl = "http://localhost:8000/api/addresses";

    const { ddd, gia, ibge, siafi, ...validFields } = fetchedZipCode;

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validFields),
    };

    try {
        const response = await fetch(baseUrl, options);
        const address = await response.json();

        addAddressToTable(address);
    } catch (err) {
        console.error(err);
    }
}
