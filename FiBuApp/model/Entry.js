class Entry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = History;
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
        
        let sollAccount = registeredAccounts.find(account => account.accountName === sollName);
        if (sollAccount == !null) {
            sollAccount.addEntry(true, this.id, this.sollSum);
        } else {
            let theNewAccount = new Account(this.sollName);
            theNewAccount.addEntry(false, this.id, this.sollName);
        }


        let habenAccount = registeredAccounts.find(account => account.accountName === habenName);
        if (sollAccount == !null) {
            habenAccount.addEntry(false, this.id, this.habenSum);
        } else {
            let theNewAccount = new Account(this.habenName);
            theNewAccount.addEntry(false, this.id, this.habenSum);
        }


        
    }
}