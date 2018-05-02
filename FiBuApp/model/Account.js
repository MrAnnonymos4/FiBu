class Account {
    constructor(accountName, accountType) {
        this.theAccountId = accountName;
        this.accountType = accountType;
        this.theDraggableObject = new Draggable(this.theAccountId + "Draggable", this.calculateDraggableXPosition(), 0);
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
        this.accountTable.addSollData(history.getEntryCount(), anEntry.sollSum);
    }

    addHabenEntry(anEntry) {
        this.accountTable.addHabenData(history.getEntryCount(), anEntry.habenSum);
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

    checkIfAccountHasEbkEntry(){
        
    }
}


