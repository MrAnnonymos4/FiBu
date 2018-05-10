class Table{
    constructor(accountId, accountType) {
        this.theTableName = accountId + "Table";
        this.theDraggableObject = new Draggable(this.theTableName + "Draggable");
        this.theDraggableHtmlElement = document.getElementById(this.theTableName + "Draggable");
        this.theTableObject;
        this.theTableHtmlElement;
        this.theRowCount;

        this.tableColumns = [
            {
                class: "cell",
                field: "sollName",
                title: "S"
            },
            {
                class: "cell",
                field: "sollEntries",
                title: "Soll"
            },
            {
                class: "cell",
                field: "habenName",
                title: "H"
            },
            {
                class: "cell",
                field: "habenEntries",
                title: "Haben"
            }
        ];

        this.tableRows = [];

        //Tabellen Überschrift Div erstellen
        let theDescriptionElement = document.createElement("div");
        theDescriptionElement.classList.add("widgetLabel");
        theDescriptionElement.innerHTML = this.theTableName.replace("Table", "");
        this.theDraggableHtmlElement.appendChild(theDescriptionElement);

        //HTML Tabellenelement erstellen
        let theNewTableElement = document.createElement("table");
        theNewTableElement.setAttribute("id", this.theTableName);

        //HTML Tabellenelement in Haben Tabellen Div einfügen
        this.theDraggableHtmlElement.appendChild(theNewTableElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theTableHtmlElement = $('#' + this.theTableName);
        this.theTableHtmlElement.bootstrapTable({ columns: this.tableColumns });

    }



    appendSollData(sollNameData, sollSum) {
        if (this.getLastNotEmptySollRow() >= this.getLastNotEmptyHabenRow()) {
            this.tableRows.push({ sollName: sollNameData, sollEntries: sollSum, habenName: "", habenEntries: "" });
        }
        //Wenn Habenseite auf diesem Level bereits Einträge hat, dann aktualisiere den entsprechenden Eintrag indem Soll Daten dazugeschrieben werden
        else {
            let rowToBeManipulated = this.getLastNotEmptySollRow();
            this.tableRows[rowToBeManipulated].sollName = sollNameData;
            this.tableRows[rowToBeManipulated].sollEntries = sollSum;
        }

        this.updateTableDataset();
        //this.theDraggableObject.resize(this.getOffsetHeight + 20); 
    }

    appendHabenData(habenNameData, habenSum) {
        if (this.getLastNotEmptyHabenRow() >= this.getLastNotEmptySollRow()) {
            this.tableRows.push({ sollName: "", sollEntries: "", habenName: habenNameData, habenEntries: habenSum });
        }
        //Wenn Habenseite auf diesem Level bereits Einträge hat, dann aktualisiere den entsprechenden Eintrag indem Soll Daten dazugeschrieben werden
        else {
            let rowToBeManipulated = this.getLastNotEmptyHabenRow();
            this.tableRows[rowToBeManipulated].habenName = habenNameData;
            this.tableRows[rowToBeManipulated].habenEntries = habenSum; 
        }

        this.updateTableDataset();
        //this.theDraggableObject.resize(this.getOffsetHeight + 20);
    }

    getLastNotEmptySollRow() {
        let tempCount = this.tableRows.length - 1;
        for (tempCount; tempCount >= 0; tempCount--) {
            if (this.tableRows[tempCount].sollName != "") {
                return tempCount+1;
            }
        }
        return 0;
    }

    getLastNotEmptyHabenRow() {
        let tempCount = this.tableRows.length - 1;
        for (tempCount; tempCount >= 0; tempCount--) {
            if (this.tableRows[tempCount].habenName != "") {
                return tempCount+1;
            }
        }
        return 0;
    }

    updateTableDataset() {
        this.theTableHtmlElement.bootstrapTable('load', this.tableRows);
    }


    getOffsetHeight() {
        return this.theTableHtmlElement.offsetHeight
    }

    getOffsetWidth() {
        return this.theTableHtmlElement.getOffsetWidth
    }

    setTablePosition(accountType) {
        this.theDraggableObject.findPositionByAccountType(accountType);
    }
}