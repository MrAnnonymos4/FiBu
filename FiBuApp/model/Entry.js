class Entry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = History;
        this.sollName = sollName;
        this.sollSum = sollSum;
        this.habenName = habenName;
        this.habenSum = habenSum;
    }

    post() {
        let sollAccount = registeredAccounts.find(account => account.name === sollName);
        sollAccount.addEntry(true, this.id, this.sollSum);

        let habenAccount = registeredAccounts.find(account => account.name === habenName);
        habenAccount.addEntry(false, this.id, this.habenSum);
    }
}