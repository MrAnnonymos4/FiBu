class Draggable {
    constructor(draggableId, draggableType, xPosition, yPosition) {
        this.theDraggableId = draggableId;
        this.theDraggableType = draggableType;
        this.theDraggableHtmlElement;
        this.theXPostion = xPosition;
        this.theYPosition = yPosition;



        let theNewHtmlDraggableElement = document.createElement("div");
        theNewHtmlDraggableElement.classList.add("draggable");
        theNewHtmlDraggableElement.setAttribute("id", this.theDraggableId);
       // theNewHtmlDraggableElement.style.width = 80 + 'px';

        document.getElementById("accountSpace").appendChild(theNewHtmlDraggableElement);

        this.theDraggableHtmlElement = document.getElementById(this.theDraggableId);
        this.reposition(this.theXPostion, this.theYPosition);

        
    }

    resize(newHeight) {
        let theDraggable = document.getElementById(this.theDraggableId)
        theDraggable.style.height = newHeight + "px";
    }

    reposition(xData, yData) {
        this.theXPostion = xData;
        this.theYPostion = yData;

        if (this.theXPostion == null) {
            this.theXPostion = clientSections[2];
        }

        if (this.theYPostion == null) {
            this.theYPostion = document.getElementById("accountSpace").clientHeight / 2;
        }

        this.theDraggableHtmlElement.style.webkitTransform =
            this.theDraggableHtmlElement.style.transform =
            'translate(' + this.theXPostion + 'px, ' + this.theYPostion + 'px)';

        // update the position attributes
        this.theDraggableHtmlElement.setAttribute('data-x', this.theXPostion);
        this.theDraggableHtmlElement.setAttribute('data-y', this.theYPostion);
    }

    

}