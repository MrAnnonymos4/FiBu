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




    }


    appendData(theNewData) {
        this.theTableObject.bootstrapTable('append', theNewData);
        this.theDraggableElement.resize(this.getOffsetHeight + 20); //Resize the widget according to new table size
    }

    addSollData(sollCount, sollSum) {
        this.theSollTableObject.appendSollData(sollCount, sollSum);
        this.theHabenTableObject.appendBlankRow();
    }

    addHabenData(habenCount, habenSum) {
        this.theHabenTableObject.appendHabenData(habenCount, habenSum);
        this.theSollTableObject.appendBlankRow();
    }

    getOffsetHeight() {
        return this.theTableHtmlElement.offsetHeight
    }

    getOffsetWidth() {
        return this.theTableHtmlElement.getOffsetWidth
    }


    
 
}