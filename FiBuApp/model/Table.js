class Table {
    constructor(tableName, widgetId) {
        this.tableId = tableName + "Table";
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
        theTableHtmlElement.setAttribute("id", this.tableId);
        document.getElementById(this.theWidgetId).appendChild(theTableHtmlElement);
        let $table = $('#' + this.tableId);
        try {
            $(function () { $table.bootstrapTable(this.columns); }); 
            console.log("1");
        } catch(err){
            $(function () { $table.bootstrapTable(this.columns); }); 
            console.log("2");
        }


        

        
    }


    appendData(theNewData) {
        $(function () { $('#' + this.tableId).bootstrapTable('append', theNewData); }); 
    }
}