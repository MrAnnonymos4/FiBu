class Table {
    constructor(tableName, widgetId) {
        this.tableName = tableName;
        this.theWidgetId = widgetId;
        this.theWidget = $("#" + this.widgetId);
        this.theTable;

       

        this.columns = [
            {
                field: "sollCount",
                title: "#"
            },
            {
                field: "Soll",
                title: "sollEntries"
            },
            {
                field: "habenCount",
                title: "#"
            },
            {
                field: "habenEntries",
                title: "#"
            }
        ]
        let theTableHtmlElement = document.createElement("table");
        theTableHtmlElement.setAttribute("id", this.tableName);
        theTableHtmlElement.appendChild(bootstrapTable(this.columns));
        this.theTable = document.getElementById(this.theWidgetId).appendChild(theTableHtmlElement);
    }


    appendData(theNewData) {
        theTable.bootstrapTable('append', theNewData);
    }
}