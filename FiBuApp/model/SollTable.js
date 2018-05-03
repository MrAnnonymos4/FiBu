class SollTable {
    constructor(theTableName, theSollTableDiv) {
        this.theSollTableId = "soll" + theTableName;
        this.theSollTableHtmlObject;
        this.theSollRows = [];
        this.theSollColumns = [
            {
                class: "cell",
                field: "sollName",
                title: "S"
            },
            {
                class: "cell",
                field: "sollEntries",
                title: "Soll"
            }
        ]

        //HTML Tabellenelement erstellen
        let theSollTableHtmlElement = document.createElement("table");
        theSollTableHtmlElement.setAttribute("id", this.theSollTableId);
        //theSollTableHtmlElement.classList.add("sollTable");

        //HTML Tabellenelement in Soll Tabellen Div einfügen
        theSollTableDiv.appendChild(theSollTableHtmlElement);

        //Erstellte Tabelle als JQuerry Objekt finden und als Bootstrap Table initialisieren
        this.theSollTableHtmlObject = $('#' + this.theSollTableId);
        this.theSollTableHtmlObject.bootstrapTable({ columns: this.theSollColumns });
    }

    /*
	Füge neue Daten der Tabelle hinzu. Verhindere dabei Lücken zwischen den Einträgen.
	Wenn bereits Reihen existieren und nicht eine leere Reihe eingetragen werden soll, dann überprüfe ob die letzte existierende Reihe eine leere ist.
	Wenn dies der Fall ist, dann suche die letzte Reihe die nicht leer ist und füge neue Reihe dahinter ein.
	*/

    appendSollData(sollName, sollSum) {
        if (this.theSollRows.length > 0 && sollName != 0){
			if (this.theSollRows[this.theSollRows.length - 1].sollName == 0){
                this.theSollRows[this.getLastNotEmptyRow() + 1] = { sollName: sollName, sollEntries: sollSum };
			} else{
                this.theSollRows.push({ sollName: sollName, sollEntries: sollSum });
			}
		}
		else{
            this.theSollRows.push({ sollName: sollName, sollEntries: sollSum });
		}

        this.updateSollTableDataset();
    }

	//Füge in this.theHabenRows eine leere Reihe ein
    appendBlankRow() {
        this.appendSollData("", "");
    }

    //Aktualisiere die angezeigte Tabelle mit den Einträgen in this.theHabenRows;
    updateSollTableDataset() {
        this.theSollTableHtmlObject.bootstrapTable('load', this.theSollRows);
    }

    //Ermittle die letzte Reihe die nicht leer ist. Ist die erste Reihe der Tabelle leer, gebe -1 zurück.
	getLastNotEmptyRow(){
		let tempCount = this.theSollRows.length - 1;
		for (tempCount; tempCount >= 0; tempCount--){
			if (this.theSollRows[tempCount].sollName != ""){
				return tempCount;
			}
		}
		return -1;
	}

    //Ermittle die Summe aller in der Tabelle enthaltenen Einträge.
	calculateEntriesColumnSum(){
		let entriesSum = 0;
		for (let tempCount = 0; tempCount < this.theSollRows.length; tempCount++){
			if(this.theSollRows[tempCount].sollEntries != ""){
			entriesSum = entriesSum + this.theSollRows[tempCount].sollEntries;
			}
		}
		return entriesSum;
	}


}