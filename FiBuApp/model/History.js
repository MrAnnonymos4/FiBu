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

    var items = [
                [1, "Bank", "1000", "EBK", "1000"],
                [2, "BGA", "500", "EBK", "500"]
                ];

    return items;
    }

    getHtml() {
        
    }
}


