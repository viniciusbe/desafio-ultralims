let fetchedZipCode;

const fetchZipCode = async (zipCode) => {
    const baseUrl = "https://viacep.com.br/ws";
    lastZipCodeFetched = zipCode;

    const sanitizedZipCode = zipCode.replace("-", "");
    try {
        toggleFetchLoadingStatus(true);

        const response = await fetch(`${baseUrl}/${sanitizedZipCode}/json`, {
            method: "GET",
        });
        const addressOrError = await response.json();

        toggleFetchLoadingStatus(false);

        if (addressOrError.erro) {
            setFetchErrorStatus(true);
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
            disableSaveButton(false);
        }
    } catch (err) {
        console.error(err);
    }
};

const showAddress = (fetchedAddress) => {
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

        const curAddressKey = addressKeys[index];
        spanEl.innerHTML = fetchedAddress[curAddressKey] || "--";
    });
};

const handleErrors = () => {};

const setFetchStatusContent = (content) => {
    document.getElementById("fetch_status").innerHTML = content;
};

const toggleFetchLoadingStatus = (isLoading) => {
    document.getElementById("zip_code_input").disabled = isLoading;
    setFetchStatusContent(isLoading ? "Buscando..." : "");
};

const setFetchErrorStatus = (isError) => {
    setFetchStatusContent(isError ? "CEP não encontrado." : "");
    setTimeout(clearFetchStatus, 5000);
};

const clearFetchStatus = () => {
    setFetchStatusContent("");
};
