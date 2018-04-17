class Account {
    constructor(accountName) {
        this.accountName = accountName;
        this.gridsterElement = theMainGridster;
        this.accountWidget = this.gridsterElement.createNewWidget(this.accountName + "Widget");
        this.accountTable = new Table(this.accountName + "Table", this.accountName + "Widget");

        
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


