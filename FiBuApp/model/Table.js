class Table {
    constructor(tableName, widgetId) {
        this.tableName = tableName;
        this.theWidget = "test";
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
        this.theTable = document.getElementById(widgetId).bootstrapTable(this.columns);
    }


    appendData(theNewData) {
        theTable.bootstrapTable('append', theNewData);
    }
}