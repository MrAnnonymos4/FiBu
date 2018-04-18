class Table {
    constructor(tableId, draggableId, draggableElement) {
        this.theTableId = tableId;
        this.theDraggableId = draggableId;
        this.theDraggableHtmlElement = document.getElementById(this.theDraggableId);
        this.theDraggableElement = draggableElement;
        this.theTable;

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
        theDescriptionElement.innerHTML = this.theTableId;
        let theTableHtmlElement = document.createElement("table");
        theTableHtmlElement.setAttribute("id", this.theTableId);
        this.theDraggableHtmlElement.appendChild(theDescriptionElement);
        this.theDraggableHtmlElement.appendChild(theTableHtmlElement);

        this.theTable = $('#' + this.theTableId);
        this.theTable.bootstrapTable({ columns: this.columns });
    }


    appendData(theNewData) {
        this.theTable.bootstrapTable('append', theNewData);
        this.theDraggableElement.resize(document.getElementById(this.theTableId).offsetHeight + 20);//Resize the widget according to new table size
    }
 
}