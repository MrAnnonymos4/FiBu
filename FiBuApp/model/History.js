class History {
    constructor(id) {
        this.entryCount = 1;
        this.id = id;
    }

    addEntryToHistory(anEntry) {
        entryCount = entryCount + 1
    }

    getHistory(){

    var items = [
                [1, "Bank", "1000", "EBK", "1000"],
                [2, "BGA", "500", "EBK", "500"]
                ];

    return items;
    }

    static countEntries() {
        return entryCount;
    }

}


