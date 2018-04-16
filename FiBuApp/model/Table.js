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
        let theDescriptionElement = document.createElement("div");
        theDescriptionElement.classList.add("widgetLabel");
        theDescriptionElement.innerHTML = this.tableName;
        let theTableHtmlElement = document.createElement("table");
        theTableHtmlElement.setAttribute("id", this.tableName);
        document.getElementById(this.widgetId).appendChild(theDescriptionElement);
        document.getElementById(this.widgetId).appendChild(theTableHtmlElement);

        this.table = $('#' + this.tableName);
        this.table.bootstrapTable({ columns: this.columns });
    }


    appendData(theNewData) {
        this.table.bootstrapTable('append', theNewData);
        //this.resize();
    }

    resize() {
        let theNewTableWidth = document.getElementById(this.tableName).offsetWidth;
        let theNewTableHeight = document.getElementById(this.tableName).offsetHeight;

        //theMainGridster.resize_widget(this.widget, theNewTableWidth, theNewTableHeight);
        $("#" + theMainGridster.theGridsterId + " ul").gridster().data('gridster').resize_widget(this.widget, 300, 444);//theNewTableWidth, theNewTableHeight);
    }
}