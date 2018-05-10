class Draggable {
    constructor(draggableId) {
        this.theDraggableId = draggableId;
        this.theDraggableHtmlElement;
        this.theXPosition = 0;
        this.theYPosition = 0;


        let theNewHtmlDraggableElement = document.createElement("div");
        theNewHtmlDraggableElement.classList.add("draggable");
        theNewHtmlDraggableElement.setAttribute("id", this.theDraggableId);

        document.getElementById("accountSpace").appendChild(theNewHtmlDraggableElement);

        this.theDraggableHtmlElement = document.getElementById(this.theDraggableId);
    }

    resize(newHeight) {
        let theDraggable = document.getElementById(this.theDraggableId)
        theDraggable.style.height = newHeight + "px";
    }

    findPositionByAccountType(accountType) {
        //find the draggable initial X position by account type
        let theDraggableXPosition = 0;
        switch (accountType) {
            case "ebk":
                theDraggableXPosition = clientSections[2];
                break;
            case "aktiv":
                theDraggableXPosition = clientSections[0];
                break;
            case "passiv":
                theDraggableXPosition = clientSections[4];
                break;
            case "ertrag":
                theDraggableXPosition = clientSections[1];
                break;
            case "aufwand":
                theDraggableXPosition = clientSections[3];
                break;
            default:
                theDraggableXPosition = clientSections[2]
        }

        //Berechne die Y Position eines Draggables. Summiere dabei die Höhe aller bereits existierenden Draggables die den selben Account Typ beinhalten.
        let theDraggableYPosition = 0;
        if (accountType != "ebk") {
            for (let tempCount = 0; tempCount < registeredAccounts.length; tempCount++) {
                if (registeredAccounts[tempCount].accountType == accountType) {
                    theDraggableYPosition = theDraggableYPosition + registeredAccounts[tempCount].accountTable.theDraggableObject.getHtmlHeight();
                }
            }
            //Offset hinzufügen, sodass alle Konten unter EBK stehen.
            theDraggableYPosition = theDraggableYPosition + 30;
        } 

        this.reposition(theDraggableXPosition + 10, theDraggableYPosition + 10);
    }

    reposition(xData, yData) {
        this.theXPosition = xData;
        this.theYPosition = yData;

        if (this.theXPosition == null) {
            this.theXPosition = 0;
        }

        if (this.theYPosition == null) {
            this.theYPosition = document.getElementById("accountSpace").clientHeight / 2;
        }

        this.theDraggableHtmlElement.style.webkitTransform =
            this.theDraggableHtmlElement.style.transform =
            'translate(' + this.theXPosition + 'px, ' + this.theYPosition + 'px)';

        // update the position attributes
       this.theDraggableHtmlElement.setAttribute('data-x', this.theXPosition);
        this.theDraggableHtmlElement.setAttribute('data-y', this.theYPosition);
    }

    getHtmlHeight() {
        return this.theDraggableHtmlElement.offsetHeight;
    }

    

}