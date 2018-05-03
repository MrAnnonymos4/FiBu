class Account {
    constructor(accountName, accountType) {
        this.theAccountId = accountName;
        this.accountType = accountType;
        this.theDraggableObject = new Draggable(this.theAccountId + "Draggable", this.calculateDraggableXPosition() + 10, this.calculateDraggableYPosition() + 10);
        this.accountTable = new Table(this.theAccountId, this.theDraggableObject.theDraggableId, this.theDraggableObject);
        
        registeredAccounts.push(this);

    }

    addEntry(anEntry, isActive) {
        if (isActive) {
            this.addSoll(anEntry);
        } else if (!isActive) {
            this.addHaben(anEntry);
        } else {
            throw "Illegal Entry";
        }
    }

    addSollEntry(anEntry) {
        this.accountTable.addSollData(anEntry.sollName, anEntry.sollSum);
    }

    addHabenEntry(anEntry) {
        this.accountTable.addHabenData(anEntry.habenName, anEntry.habenSum);
    }


    //find the draggable initial X position by account type
    calculateDraggableXPosition() {
        let theDraggableXPosition = 0;

        switch (this.accountType) {
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
        return theDraggableXPosition;
    }

    //Berechne die Y Position eines Draggables. Summiere dabei die Höhe aller bereits existierenden Draggables die den selben Account Typ beinhalten.
    calculateDraggableYPosition() {
        let yPosition = 0;
        
        if (this.accountType != "ebk") {
            for (let tempCount = 0; tempCount < registeredAccounts.length; tempCount++) {
                if (registeredAccounts[tempCount].accountType == this.accountType) {
                    yPosition = yPosition + registeredAccounts[tempCount].theDraggableObject.getHtmlHeight();
                }
            }
            //Offset hinzufügen, sodass alle Konten unter EBK stehen.
            yPosition = yPosition + 30;
        } 
        return yPosition
    }
}


