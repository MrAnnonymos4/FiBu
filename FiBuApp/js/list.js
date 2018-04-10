class StaticList {
    constructor(anArray) {
        this.rows = [];
        this.rowWidths = anArray;
    }

    addRow(anArray) {
        let theRow = new StaticListRow(this);
        this.rows.push(theRow);
        for (var eachCellIndex = 0; eachCellIndex < anArray.length; eachCellIndex++) {
            theRow.addCell(anArray[eachCellIndex]);
        }
        return this;
    }

    getHtml() {
        let theString = '<table class="listTable mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">';
        this.rows.forEach(eachRow => {
            theString += eachRow.getHtml();
        });
        return theString + "</tr>";
    }

    getHtmlElement() {
        let theDiv = document.createElement("div");
        theDiv.innerHTML = this.getHtml();
        return theDiv;
    }
}

class StaticListRow {
    constructor(aStaticList) {
        this.staticList = aStaticList;
        this.cells = [];
    }

    addCell(aString) {
        let theCell = new StaticListCell(this, aString);
        this.cells.push(theCell);
    }

    getHtml() {
        let theString = "<tr>";
        for (var eachCellIndex = 0; eachCellIndex < this.cells.length; eachCellIndex++) {
            theString += this.cells[eachCellIndex].getHtml();
        }
        return theString + "</tr>";
    }
}

class StaticListCell {
    constructor(aRow, aString) {
        this.text = aString;
        this.isLeftAlign = true;
        this.row = aRow;
    }

    getHtml() {
        let theString;
        if (this.isLeftAlign) {
            theString = '<td class="mdl-data-table__cell--non-numeric">';
        } else {
            theString = "<td>";
        }
        return theString + this.text + "</td>";
    }
}