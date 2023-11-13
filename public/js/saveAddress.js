const Errors = {
    ZIP_CODE_ALREADY_EXISTS: "CEP já cadastrado.",
    INVALID_FIELDS: "Um ou mais campos estão inválidos.",
    INTERNAL_EXCEPTION: "Ocorreu um erro no servidor.",
    DEFAULT: "Ocorreu um erro inesperado",
};

const saveAddress = async () => {
    const baseUrl = "http://localhost:8000/api/addresses";

    const { ddd, gia, ibge, siafi, ...validFields } = fetchedZipCode;

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validFields),
    };

    try {
        toggleSaveLoadingStatus(true);

        const response = await fetch(baseUrl, options);
        const addressOrError = await response.json();

        toggleSaveLoadingStatus(false);

        if (response.status === 400) {
            throw new Error(addressOrError.code);
        }

        setSaveSuccessStatus();
        fetchData();
    } catch (err) {
        setSaveErrorStatus(err.message);
        console.error(err);
    }
};

const setSaveStatusContent = (content) => {
    document.getElementById("save_status").innerHTML = content;
};

const toggleSaveLoadingStatus = (isLoading) => {
    if (isLoading) {
        disableSaveButton(isLoading);
    }

    setSaveStatusContent(isLoading ? "Salvando..." : "");
};

const setSaveErrorStatus = (errCode) => {
    const errorMessage = Errors[errCode] || Errors.DEFAULT;

    disableSaveButton(false);
    setSaveStatusContent(errorMessage);
    setTimeout(clearSaveStatus, 5000);
};

const setSaveSuccessStatus = () => {
    setSaveStatusContent("Endereço salvo com sucesso!");
    setTimeout(clearSaveStatus, 5000);
};

const disableSaveButton = (isDisabled) => {
    document.getElementById("save_button").disabled = isDisabled;
};

const clearSaveStatus = () => {
    setSaveStatusContent("");
};
