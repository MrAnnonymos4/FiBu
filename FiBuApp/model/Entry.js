class Entry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = History;
        this.sollName = sollName;
        this.sollSum = sollSum;
        this.habenName = habenName;
        this.habenSum = habenSum;
    }

    post() {
        let sollAccount = registeredAccounts.find(account => account.accountName === sollName);
        if (sollAccount == !null) {
            sollAccount.addEntry(true, this.id, this.sollSum);
        } else {
            throw "Cannot add Entry to not existing account"
        }


        let habenAccount = registeredAccounts.find(account => account.accountName === habenName);
        if (sollAccount == !null) {
            habenAccount.addEntry(false, this.id, this.habenSum);
        } else {
            throw "Cannot add Entry to not existing account"
        }
        
    }
}