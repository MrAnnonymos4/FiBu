class Entry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = "1"; //Add history.count()
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
        let sollAccount = registeredAccounts.find(account => account.accountName === this.sollName);
        if (sollAccount == null) {
            let theNewAccount = new Account(this.sollName);
            theNewAccount.addSollEntry(this);
        } else {
            sollAccount.addSollEntry(this);
        }


        let habenAccount = registeredAccounts.find(account => account.accountName === this.habenName);
        if (habenAccount == null) {
            let theNewAccount = new Account(this.habenName);
            theNewAccount.addHabenEntry(this);
        } else {
            habenAccount.addHabenEntry(this);
        }


        
    }
}