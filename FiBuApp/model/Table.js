class Table {
    constructor(tableName, widgetId) {
        this.tableName = tableName;
        this.widgetId = widgetId;
        this.widget = $("#" + this.widgetId);
        this.table;

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
        this.resize();
    }

    //Resize the widget according to new table size
    resize() {
        //let theNewTableWidth = document.getElementById(this.tableName).offsetWidth;
        let theNewTableHeight = document.getElementById(this.tableName).offsetHeight;

        //this.widget[0].style.width = theNewTableWidth + "px";
        this.widget[0].style.height = theNewTableHeight + 20 + "px"; // Adding height for css/style.css/.widgetLabel height
    }
}