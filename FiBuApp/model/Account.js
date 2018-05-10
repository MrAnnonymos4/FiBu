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
        this.accountTable.appendSollData(anEntry.sollName, anEntry.sollSum);
        
    }

    addHabenEntry(anEntry) {
        this.accountTable.appendHabenData(anEntry.habenName, anEntry.habenSum);
    }

    //saveHtmlData() {
    //    this.theAccountHtmlData = $('#' + this.theDraggableObject.theDraggableId);
    //    return this.theAccountHtmlData;
    //}

    loadHtmlData() {
        document.getElementById("accountSpace").appendChild(this.theAccountHtmlData);
    }

    //deleteAccount() {
    //    //Lösche HTML Element
    //    this.theDraggableObject.theDraggableHtmlElement.remove();

    //    //Lösche Account aus registeredAccounts Array
    //    for (let tempCount = 0; tempCount < registeredAccounts.length; tempCount++) {
    //        if (registeredAccounts[tempCount].accountName == this.accountName) {
    //            registeredAccounts.splice(tempCount - 1, 1);
    //        }
    //    }
    //}



}


