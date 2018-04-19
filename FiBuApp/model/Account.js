class Account {
    constructor(accountName, accountType) {
        this.theAccountId = accountName;
        this.accountType = accountType;
        this.theDraggableObject = new Draggable(this.theAccountId + "Draggable", this.accountType, this.calculateDraggableXPosition(), 0);//document.getElementById("accountSpace").clientHeight / 2);
        this.accountTable = new Table(this.theAccountId + "Table", this.theDraggableObject.theDraggableId, this.theDraggableObject);
        
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
        let theNewSollData = [{
            sollCount: theHistory.getEntryCount(),
            sollEntries: anEntry.sollSum,
            habenCount: "",
            habenEntries: ""
        }]
        this.accountTable.appendData(theNewSollData);
    }

    addHabenEntry(anEntry) {
        let theNewHabenData = [{
            sollCount: "",
            sollEntries: "",
            habenCount: theHistory.getEntryCount(),
            habenEntries: anEntry.habenSum
        }];
        this.accountTable.appendData(theNewHabenData);
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
}


