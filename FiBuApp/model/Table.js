class Table {
    constructor(tableName, widgetId) {
        this.tableName = tableName;
        this.widgetId = widgetId;
        this.widget = $("#" + this.widgetId);
        this.table;

        this.columns = [
            {
                field: "sollCount",
                title: "#"
            },
            {
                field: "sollEntries",
                title: "Soll"
            },
            {
                field: "habenCount",
                title: "#"
            },
            {
                field: "habenEntries",
                title: "Haben"
            }
        ]

        let theTableHtmlElement = document.createElement("table");
        theTableHtmlElement.setAttribute("id", this.tableName);
        document.getElementById(this.widgetId).appendChild(theTableHtmlElement);

        this.table = $('#' + this.tableName);
        this.table.bootstrapTable({ columns: this.columns });
    }


    appendData(theNewData) {
        this.table.bootstrapTable('append', theNewData);
    }
}