class HabenTable {
    constructor(theTableName, theHabenTableDiv) {
        this.theHabenTableId = "haben" + theTableName;
        this.theHabenTableHtmlObject;
        this.theHabenRows = [];
        this.theHabenColumns = [
            {
                class: "cell",
                field: "habenCount",
                title: "#"
            },
            {
                class: "cell",
                field: "habenEntries",
                title: "Haben"
            }
        ]

        //HTML Tabellenelement erstellen
        let theHabenTableHtmlElement = document.createElement("table");
        theHabenTableHtmlElement.setAttribute("id", this.theHabenTableId);
        //theHabenTableHtmlElement.classList.add("habenTable");

        //HTML Tabellenelement in Haben Tabellen Div einfügen
        theHabenTableDiv.appendChild(theHabenTableHtmlElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theHabenTableHtmlObject = $('#' + this.theHabenTableId);
        this.theHabenTableHtmlObject.bootstrapTable({ columns: this.theHabenColumns });
    }

    appendHabenData(habenCountData, habenSum) {
        this.theHabenRows.push({ habenCount: habenCountData, habenEntries: habenSum });
        this.updateHabenTableDataset();
    }

    appendBlankRow() {
        this.appendHabenData("", "");
    }

    updateHabenTableDataset() {
        this.theHabenTableHtmlObject.bootstrapTable('load', this.theHabenRows);
    }

}

//Todo finde letzten leeren eintrag in liste und ersetze durch vollen wert