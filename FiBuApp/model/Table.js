class Table {
    constructor(accountId, draggableId, draggableElement) {
        this.theTableName = accountId + "Table";
        this.theDraggableId = draggableId;
        this.theDraggableHtmlElement = document.getElementById(this.theDraggableId);
        this.theDraggableElement = draggableElement;
        this.theTableObject;
        this.theTableHtmlElement;
        this.theRowCount;

        let theSollTableObject;
        let theHabenTableObject;
        let theSollSumDivHtmlElement;
        let theHabenSumDivHtmlElement;

        
        //Tabellen Überschrift Div erstellen
        let theDescriptionElement = document.createElement("div");
        theDescriptionElement.classList.add("widgetLabel");
        theDescriptionElement.innerHTML = this.theTableName.replace("Table", "");
        this.theDraggableHtmlElement.appendChild(theDescriptionElement);

        //Soll Tabellen Div erstellen
        let theSollTableDiv = document.createElement("div");
        theSollTableDiv.setAttribute("id", "sollDiv" + this.theTableName);
        theSollTableDiv.classList.add("sollTableDiv");
        this.theDraggableHtmlElement.appendChild(theSollTableDiv);

        //Haben Tabellen Div erstellen
        let theHabenTableDiv = document.createElement("div");
        theHabenTableDiv.setAttribute("id", "habenDiv" + this.theTableName);
        theHabenTableDiv.classList.add("habenTableDiv");
        this.theDraggableHtmlElement.appendChild(theHabenTableDiv);

        //Soll Tabelle erstellen
        this.theSollTableObject = new SollTable(this.theTableName, theSollTableDiv);

        //Haben Tabelle erstellen
        this.theHabenTableObject = new HabenTable(this.theTableName, theHabenTableDiv);

        //Summen Div erstellen, Summen Div für Haben und Soll Tabelle anhängen
        let theSumDivSpace = document.createElement("div");

        this.theHabenSumDivHtmlElement = document.createElement("div");
        this.theHabenSumDivHtmlElement.classList.add("tableSumDiv");
        this.theHabenSumDivHtmlElement.setAttribute("style", "float: right");
        theSumDivSpace.appendChild(this.theHabenSumDivHtmlElement);

        this.theSollSumDivHtmlElement = document.createElement("div");
        this.theSollSumDivHtmlElement.classList.add("tableSumDiv");
        this.theSollSumDivHtmlElement.setAttribute("style", "float: left");
        theSumDivSpace.appendChild(this.theSollSumDivHtmlElement);

        this.theDraggableHtmlElement.appendChild(theSumDivSpace);
    }

    //Neue Daten {sollCount, sollEntries, habenCount, habenEntries} der Tabelle hinzufügen.
    appendData(theNewData) {
        this.theTableObject.bootstrapTable('append', theNewData);
        this.theDraggableElement.resize(this.getOffsetHeight + 20); //Resize the widget according to new table size
    }

    //Neue Soll Daten der Tabelle hinzufügen. Bei Haben Tabelle eine leere Zeile einfügen. Dann Summe in entsprechenden Summen Div aktualisieren.
    addSollData(sollName, sollSum) {
        this.theSollTableObject.appendSollData(sollName, sollSum);
		if (this.theSollTableObject.theSollRows.length > this.theHabenTableObject.theHabenRows.length){
			this.theHabenTableObject.appendBlankRow();
        }
        this.refreshSollSum();
    }

    //Neue Haben Daten der Tabelle hinzufügen. Bei Haben Tabelle eine leere Zeile einfügen. Dann Summe in entsprechenden Summen Div aktualisieren.
    addHabenData(habenName, habenSum) {
        this.theHabenTableObject.appendHabenData(habenName, habenSum);
		if (this.theHabenTableObject.theHabenRows.length > this.theSollTableObject.theSollRows.length){
			this.theSollTableObject.appendBlankRow();
        }
        this.refreshHabenSum();
    }

    //Aktualisiert die im Haben Summen Div angezeigt Summe aller entsprechender Buchungen.
    refreshHabenSum() {
        let habenTableSum = this.theHabenTableObject.calculateEntriesColumnSum();
        if (habenTableSum != 0) {
            this.theHabenSumDivHtmlElement.innerHTML = "Summe: " + habenTableSum;
        }
    }

    //Aktualisiert die im Soll Summen Div angezeigt Summe aller entsprechender Buchungen.
    refreshSollSum() {
        let sollTableSum = this.theSollTableObject.calculateEntriesColumnSum();
        if (sollTableSum != 0) {
            this.theSollSumDivHtmlElement.innerHTML = "Summe: " + sollTableSum;
        }
    }


    getOffsetHeight() {
        return this.theTableHtmlElement.offsetHeight
    }

    getOffsetWidth() {
        return this.theTableHtmlElement.getOffsetWidth
    }


    
 
}