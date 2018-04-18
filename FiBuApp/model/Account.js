class Account {
    constructor(accountName) {
        this.theAccountId = accountName;
        this.theDraggableHtmlElement = new Draggable(this.theAccountId + "Draggable");
        this.accountTable = new Table(this.accountName + "Table", this.theDraggableHtmlElement.theDraggableId, this.theDraggableHtmlElement);

        
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
}


