class Account {
    constructor(accountName, accountType) {
        this.theAccountId = accountName;
        this.accountType = accountType;
        this.accountTable = new Table(this.theAccountId);
        this.accountTable.setTablePosition(accountType);
        this.theAccountHtmlData;
        
        registeredAccounts.push(this);

    }


    addSollEntry(anEntry) {
        this.accountTable.appendSollData(anEntry.habenName, anEntry.sollSum);
        
    }

    addHabenEntry(anEntry) {
        this.accountTable.appendHabenData(anEntry.sollName, anEntry.habenSum);
    }

    getSollSum() {
        return this.accountTable.calculateSollSum();
    }

    getHabenSum() {
        return this.accountTable.calculateHabenSum();
    }

    //saveHtmlData() {
    //    this.theAccountHtmlData = $('#' + this.theDraggableObject.theDraggableId);
    //    return this.theAccountHtmlData;
    //}

    loadHtmlData() {
        document.getElementById("accountSpace").appendChild(this.theAccountHtmlData);
    }

    deleteAccount() {

        if (this.theAccountId == "EBK" || this.theAccountId == "SBK" || this.theAccountId == "GUV") {
            handleError("Löschung nicht möglich");
        } else if (this.accountTable.tableRows[0] != null) {
            handleError("Löschung nicht möglich");
        } else {
            //Lösche HTML Element
            this.theDraggableObject.theDraggableHtmlElement.remove();

            //Lösche Account aus registeredAccounts Array
            for (let tempCount = 0; tempCount < registeredAccounts.length; tempCount++) {
                if (registeredAccounts[tempCount].accountName == this.accountName) {
                    registeredAccounts.splice(tempCount - 1, 1);
                }
            }
        }
    }
}


