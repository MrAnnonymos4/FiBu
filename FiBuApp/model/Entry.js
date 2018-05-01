class Entry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = history.getEntryCount();
        this.sollName = sollName;
        this.sollSum = sollSum;
        this.habenName = habenName;
        this.habenSum = habenSum;
    }

    /*
    * Post the Entry to account.
    * If there is no corresponding account, create a new one and add entry afterwards.
    */
    post() {
        if (this.sollName != "") {
            let sollAccount = registeredAccounts.find(account => account.theAccountId === this.sollName);
            if (sollAccount == null) {
                let theNewAccount = new Account(this.sollName, "aktiv");
                theNewAccount.addSollEntry(this);
            } else {
                sollAccount.addSollEntry(this);
            }
        } else if (this.habenName != "") {
            let habenAccount = registeredAccounts.find(account => account.theAccountId === this.habenName);
            if (habenAccount == null) {
                let theNewAccount = new Account(this.habenName, "passiv");
                theNewAccount.addHabenEntry(this);
            } else {
                habenAccount.addHabenEntry(this);
            }
        }

        
    }
}