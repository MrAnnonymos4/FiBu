class Grid {
    constructor(theParentDivId, theGridsterId) {
        this.theGridsterId = theGridsterId;
        this.theParentDivId = theParentDivId; 
        this.widgetCounter = 0

        let theGridsterHtmlElement = document.createElement("div");
        theGridsterHtmlElement.className = "gridster";
        theGridsterHtmlElement.id = theGridsterId;


        let theUlHtmlElement = document.createElement("ul");
        theGridsterHtmlElement.appendChild(theUlHtmlElement);
        document.getElementById(theParentDivId).appendChild(theGridsterHtmlElement);
    }

    createNewWidget(theNewWidgetId) {

        this.widgetCounter = this.widgetCounter + 1;
        let theGridsterData = $("#" + this.theGridsterId + " ul").gridster().data('gridster');
        let theNewWidget = document.createElement("li");

        theNewWidget.classList.add("yellow");
        theNewWidget.setAttribute("data-col", 1);
        theNewWidget.setAttribute("data-row", this.widgetCounter);
        theNewWidget.setAttribute("data-sizex", 1);
        theNewWidget.setAttribute("data-sizey", 1);

        theGridsterData.add_widget(theNewWidget);
        
    }

}


