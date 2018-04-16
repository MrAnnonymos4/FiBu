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
            sollCount: "1",
            sollEntries: anEntry.sollSum,
            habenCount: "0",
            habenEntries: "0"
        }]
        this.accountTable.appendData(theNewSollData);
    }

    addHabenEntry(anEntry) {
        let theNewHabenData = [{
            sollCount: "0",
            sollEntries: "0",
            habenCount: "1",
            habenEntries: anEntry.habenSum
        }];
        this.accountTable.appendData(theNewHabenData);
    }
}


