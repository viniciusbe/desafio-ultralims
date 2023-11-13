let sortStatus = {
    column: "",
    type: "asc",
};

const handleOrderBy = (event) => {
    event.stopPropagation();

    const [arrowUpEl, arrowDownEl] =
        event.target.getElementsByClassName("arrows");

    const columnId = event.target.id;
    if (columnId === sortStatus.column) {
        toggleArrowsHidden(arrowUpEl, arrowDownEl);

        if (isAscSortType()) {
            sortStatus.type = "desc";
        } else {
            sortStatus.column = "";
            sortStatus.type = "asc";
            arrowUpEl.classList.toggle("arrow_disabled");
        }
    } else {
        clearColumnStatus();

        sortStatus.column = columnId;
        sortStatus.type = "asc";
        arrowUpEl.classList.toggle("arrow_disabled");
    }

    fetchData();
};

const toggleArrowsHidden = (arrowUpEl, arrowDownEl) => {
    arrowUpEl.classList.toggle("arrow_hidden");
    arrowDownEl.classList.toggle("arrow_hidden");
};

const clearColumnStatus = () => {
    const columnId = sortStatus.column;

    if (sortStatus.column != "") {
        const [arrowUpEl, arrowDownEl] = document
            .getElementById(columnId)
            .getElementsByClassName("arrows");

        arrowUpEl.classList.toggle("arrow_disabled");

        if (!isAscSortType()) {
            toggleArrowsHidden(arrowUpEl, arrowDownEl);
        }
    }
};

const isAscSortType = () => {
    return sortStatus.type === "asc";
};
