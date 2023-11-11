const handleZipCode = (event) => {
    toggleErrorState(false);

    let input = event.target;
    input.value = zipCodeMask(input.value);
};

const zipCodeMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    if (value.length == 9 && value !== lastZipCodeFetched) {
        fetchZipCode(value);
    }
    return value;
};
