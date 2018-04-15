class Account {
    constructor(accountName) {
        this.Account = "test";
        this.accountName = accountName;
        this.gridster = thePassiveSideGridster;
        this.accountWidget = thePassiveSideGridster.createNewWidget(this.accountName + "Widget");
        this.accountTable = new Table(this.accountName, this.accountName + "Widget");

        
        registeredAccounts.push(this);
    }

    getHtml() {

    }

    addEntry(isSoll, anEntry) {
        if (isSoll) {
            this.addSoll(anEntry);
        } else if (!isSoll) {
            this.addHaben(anEntry);
        } else {
            throw "Illegal Entry";
        }
    }

    addSoll(anEntry) {
        let theNewData = [{
            sollCount: 1,
            sollEntries: anEntry.sollSum,
            habenCount: 0,
            habenEntries: 0
        }]
        this.accountTable.appendData(theNewData);
    }

    addHaben(anEntry) {
        let theNewData = [{
            sollCount: "",
            sollEntries: "",
            habenCount: 1,
            habenEntries: anEntry.habenSum
        }];
        this.accountTable.appendData(theNewData);
    }

    calculateSum(){

    }


}


function getHtml() {

}



function calculateSum() {

}



