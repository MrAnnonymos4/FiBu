class Table {
    constructor(tableId, draggableId, draggableElement) {
        this.theTableId = tableId;
        this.theDraggableId = draggableId;
        this.theDraggableHtmlElement = document.getElementById(this.theDraggableId);
        this.theDraggableElement = draggableElement;
        this.theTableObject;
        this.theTableHtmlElement;

        this.columns = [
            {
                class: "cell",
                field: "sollCount",
                title: "#"
            },
            {
                field: "sollEntries",
                title: "Soll"
            },
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

        let theDescriptionElement = document.createElement("div");
        theDescriptionElement.classList.add("widgetLabel");
        theDescriptionElement.innerHTML = this.theTableId.replace("Table", "");
        this.theTableHtmlElement = document.createElement("table");
        this.theTableHtmlElement.setAttribute("id", this.theTableId);
        this.theDraggableHtmlElement.appendChild(theDescriptionElement);
        this.theDraggableHtmlElement.appendChild(this.theTableHtmlElement);

        this.theTableObject = $('#' + this.theTableId);
        this.theTableObject.bootstrapTable({ columns: this.columns });
    }


    appendData(theNewData) {
        this.theTableObject.bootstrapTable('append', theNewData);
        this.theDraggableElement.resize(this.getOffsetHeight + 20); //Resize the widget according to new table size
    }

    getOffsetHeight() {
        return this.theTableHtmlElement.offsetHeight
    }

    getOffsetWidth() {
        return this.theTableHtmlElement.getOffsetWidth
    }
 
}