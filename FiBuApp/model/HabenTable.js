class HabenTable {
    constructor(theTableName, theHabenTableDiv) {
        this.theHabenTableId = "haben" + theTableName;
        this.theHabenTableHtmlObject;
        this.theHabenRows = [];
        this.theHabenColumns = [
            {
                class: "cell",
                field: "habenName",
                title: "H"
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

        //HTML Tabellenelement in Haben Tabellen Div einf�gen
        theHabenTableDiv.appendChild(theHabenTableHtmlElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theHabenTableHtmlObject = $('#' + this.theHabenTableId);
        this.theHabenTableHtmlObject.bootstrapTable({ columns: this.theHabenColumns });
    }

	/*
	F�ge neue Daten der Tabelle hinzu. Verhindere dabei L�cken zwischen den Eintr�gen.
	Wenn bereits Reihen existieren und nicht eine leere Reihe eingetragen werden soll, dann �berpr�fe ob die letzte existierende Reihe eine leere ist.
	Wenn dies der Fall ist, dann suche die letzte Reihe die nicht leer ist und f�ge neue Reihe dahinter ein.
	*/

    appendHabenData(habenNameData, habenSum) {
		if (this.theHabenRows.length > 0 && habenNameData != 0){
			if (this.theHabenRows[this.theHabenRows.length - 1].habenName == 0){
				this.theHabenRows[this.getLastNotEmptyRow()+ 1] = { habenName: habenNameData, habenEntries: habenSum };
			} else{
				this.theHabenRows.push({ habenName: habenNameData, habenEntries: habenSum });
			}
		}
		else{
        this.theHabenRows.push({ habenName: habenNameData, habenEntries: habenSum });
		}

        this.updateHabenTableDataset();
    }

	//F�ge in this.theHabenRows eine leere Reihe ein
    appendBlankRow() {
        this.appendHabenData("", "");
    }

	//Aktualisiere die angezeigte Tabelle mit den Eintr�gen in this.theHabenRows;
    updateHabenTableDataset() {
        this.theHabenTableHtmlObject.bootstrapTable('load', this.theHabenRows);
    }

	//Ermittle die letzte Reihe die nicht leer ist. Ist die erste Reihe der Tabelle leer, gebe -1 zur�ck.
	getLastNotEmptyRow(){
		let tempCount = this.theHabenRows.length - 1;
		for (tempCount; tempCount >= 0; tempCount--){
			if (this.theHabenRows[tempCount].habenName != ""){
				return tempCount;
			}
		}
		return -1;
	}

	//Ermittle die Summe aller in der Tabelle enthaltenen Eintr�ge.
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
