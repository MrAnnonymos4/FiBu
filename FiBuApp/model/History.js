class History {
    constructor(historyId) {
        this.id = historyId;
        this.historyEntries = [];
    }

    addEntryToHistory(anEntry) {
        this.historyEntries.push(anEntry);
    }

    getEntryCount() {
        return this.historyEntries.length + 1;
    }

    getHistory(){

    }

    getHtml() {
        
    }
}


