class SollTable {
    constructor(theTableName, theSollTableDiv) {
        this.theSollTableId = "soll" + theTableName;
        this.theSollTableHtmlObject;
        this.theSollRows = [];
        this.theSollColumns = [
            {
                class: "cell",
                field: "sollCount",
                title: "#"
            },
            {
                class: "cell",
                field: "sollEntries",
                title: "Soll"
            }
        ]

        //HTML Tabellenelement erstellen
        let theSollTableHtmlElement = document.createElement("table");
        theSollTableHtmlElement.setAttribute("id", this.theSollTableId);
        //theSollTableHtmlElement.classList.add("sollTable");

        //HTML Tabellenelement in Soll Tabellen Div einfügen
        theSollTableDiv.appendChild(theSollTableHtmlElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theSollTableHtmlObject = $('#' + this.theSollTableId);
        this.theSollTableHtmlObject.bootstrapTable({ columns: this.theSollColumns });
    }

    appendSollData(sollCountData, sollSum) {
        this.theSollRows.push({ sollCount: sollCountData, sollEntries: sollSum });
        this.updateSollTableDataset();
    }

    appendBlankRow() {
        this.appendSollData("", "");
    }

    updateSollTableDataset() {
        this.theSollTableHtmlObject.bootstrapTable('load', this.theSollRows);
    }


}