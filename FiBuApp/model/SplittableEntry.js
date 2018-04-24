class SplittableEntry {
    constructor(sollName, sollSum, habenName, habenSum) {
        this.id = history.getEntryCount();
        this.sollName = [sollName];
        this.sollSum = [sollSum];
        this.habenName = [habenName];
        this.habenSum = [habenSum];
        this.subEntries = [];
    }

    /*
    * Post the Entry to account.
    * If there is no corresponding account, create a new one and add entry afterwards.
    */
    post() {
        let sollAccount = registeredAccounts.find(account => account.theAccountId === this.sollName);
        if (sollAccount == null) {
            let theNewAccount = new Account(this.sollName, "aktiv");
            theNewAccount.addSollEntry(this);
        } else {
            sollAccount.addSollEntry(this);
        }


        let habenAccount = registeredAccounts.find(account => account.theAccountId === this.habenName);
        if (habenAccount == null) {
            let theNewAccount = new Account(this.habenName, "passiv");
            theNewAccount.addHabenEntry(this);
        } else {
            habenAccount.addHabenEntry(this);
        }


        
    }

    addSplitSoll(sollName, sollSum) {
        this.sollName.push(sollName);
        this.sollSum.push(sollSum);
    }

    addSplitHaben(habenName, habenSum) {
        this.habenName.push(habenName);
        this.habenSum.push(sollSum);
    }

    split(sollName, sollSum, habenName, habenSum) {
        this.subEntries.push(sollName, sollSum, habenName, habenSum);
    }
}