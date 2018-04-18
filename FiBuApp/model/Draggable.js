class Draggable {
    constructor(draggableId) {
        this.theDraggableId = draggableId;
        this.theXPostion = 0;
        this.theYPosition = 0;



        let theNewHtmlDraggableElement = document.createElement("div");
        theNewHtmlDraggableElement.classList.add("draggable");
        theNewHtmlDraggableElement.setAttribute("id", this.theDraggableId);
        theNewHtmlDraggableElement.setAttribute("data-x", this.theXPostion);
        theNewHtmlDraggableElement.setAttribute("data-y", this.theYPosition);

        document.getElementById("accountSpace").appendChild(theNewHtmlDraggableElement);
    }

    resize(newHeight) {
        let theDraggable = document.getElementById(this.theDraggableId)
        theDraggable.setAttribute("data-x", newHeight);
    }
}