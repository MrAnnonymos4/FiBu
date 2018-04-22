class HabenTable {
    constructor(theTableName, theHabenTableDiv) {
        this.theHabenTableId = "haben" + theTableName;
        this.theHabenTableHtmlObject;
        this.theHabenRows = [];
        this.theHabenColumns = [
            {
                class: "cell",
                field: "habenCount",
                title: "#"
            },
            {
                class: "cell",
                field: "habenEntries",
                title: "Haben"
            }
        ]

        //HTML Tabellenelement erstellen
        let theHabenTableHtmlElement = document.createElement("table");
        theHabenTableHtmlElement.setAttribute("id", this.theHabenTableId);
        //theHabenTableHtmlElement.classList.add("habenTable");

        //HTML Tabellenelement in Haben Tabellen Div einfügen
        theHabenTableDiv.appendChild(theHabenTableHtmlElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theHabenTableHtmlObject = $('#' + this.theHabenTableId);
        this.theHabenTableHtmlObject.bootstrapTable({ columns: this.theHabenColumns });
    }

	/*
	Füge neue Daten der Tabelle hinzu. Verhindere dabei Lücken zwischen den Einträgen.
	Wenn bereits Reihen existieren und nicht eine leere Reihe eingetragen werden soll, dann überprüfe ob die letzte existierende Reihe eine leere ist.
	Wenn dies der Fall ist, dann suche die letzte Reihe die nicht leer ist und füge neue Reihe dahinter ein.
	*/

    appendHabenData(habenCountData, habenSum) {
		if (this.theHabenRows.length > 0 && habenCountData != 0){
			if (this.theHabenRows[this.theHabenRows.length - 1].habenCount == 0){
				this.theHabenRows[this.getLastNotEmptyRow()+ 1] = { habenCount: habenCountData, habenEntries: habenSum };
			} else{
				this.theHabenRows.push({ habenCount: habenCountData, habenEntries: habenSum });
			}
		}
		else{
        this.theHabenRows.push({ habenCount: habenCountData, habenEntries: habenSum });
		}

        this.updateHabenTableDataset();
    }

	/*
	Füge in this.theHabenRows eine leere Reihe ein
	*/
    appendBlankRow() {
        this.appendHabenData("", "");
    }

	/*
	Aktualisiere die angezeigte Tabelle mit den Einträgen in this.theHabenRows;
	*/
    updateHabenTableDataset() {
        this.theHabenTableHtmlObject.bootstrapTable('load', this.theHabenRows);
    }

	/*
	Ermittle die letzte Reihe die nicht leer ist.
	Ist die erste Reihe der Tabelle leer, gebe -1 zurück.
	*/
	getLastNotEmptyRow(){
		let tempCount = this.theHabenRows.length - 1;
		for (tempCount; tempCount >= 0; tempCount--){
			if (this.theHabenRows[tempCount].habenCount != ""){
				return tempCount;
			}
		}
		return -1;
	}

	/*
	Ermittle die Summe aller in der Tabelle enthaltenen Einträge.
	*/
	calculateEntriesColumnSum(){
		let entriesSum = 0;
		for (let tempCount = 0; tempCount < this.theHabenRows.length; tempCount++){
			if(this.theHabenRows[tempCount].habenEntries != ""){
				entriesSum = entriesSum + this.theHabenRows[tempCount].habenEntries;
			}
		}
		return entriesSum;
	}
}
