
let registeredAccounts = [];
let theHistory;
let inputNumber = 2;
let journalNumber = 1;
let flag = 0;
let newButtonFlag = 0;
let closingButtonFlag = 0;
let clientSections = [];


document.addEventListener("DOMContentLoaded", function () {
    initialize();
});


function initialize() {
    theHistory = new History();

    //calculate display sections for account types. 
    let theClientWidth = document.getElementById("accountSpace").clientWidth;
    let temp = 0;
    for (let i = 0; i < 5; i++) {
        temp = temp + (i + 1 * (theClientWidth / 5)) / 2;
        clientSections.push(temp);
    }
    
}

function alertInfo() {

    alert("Hier folgt die Info zum E-Learning Team");

}


function buchenButtonClicked() {

    let sollName = $("#sollName").val();
    let sollSum= $("#sollSum").val();
    let habenName = $("#habenName").val();
    let habenSum = $("#habenSum").val();

    let theCheck = new CheckData(sollName, sollSum, habenName, habenSum);


    if(theCheck.checkSum() == false){

        console.log("Fehler nach der Ausführung");

    }else{

    let theEntry = new Entry(sollName, sollSum, habenName, habenSum);
    theEntry.post();
    theHistory.addEntryToHistory(theEntry);

    //Werte werden aus dem Inputfeld gelöscht sobald buchenButton geklickt wurde
    document.getElementById('sollName').value = '';
    document.getElementById('sollSum').value = '';
    document.getElementById('habenName').value = '';
    document.getElementById('habenSum').value = '';

    }

}

function splitButtonClicked(){

    let table = document.getElementById("inputMask");

    if(inputNumber <= 5){

        let row = table.insertRow(inputNumber);

        let numberCell = row.insertCell(0);
        let sollCell = row.insertCell(1);
        let sollSumCell = row.insertCell(2);
        let habenCell = row.insertCell(3);
        let habenSumCell = row.insertCell(4);
    
        numberCell.innerHTML = inputNumber;
        sollCell.innerHTML= "<input type='text' id='sollName'>";
        sollSumCell.innerHTML = "<input type='number' id='sollSum'>";
        habenCell.innerHTML = "<input type='text' id='habenName'>";
        habenSumCell.innerHTML = "<input type='number' id='habenSum'>";
    

    }
    inputNumber++;


}

function journalButtonClicked(){

    let table = document.getElementById("journalTable");

    if(flag == 1){

        flag = 0;
        journalNumber = 1;

        for(let theIndex = 0; theIndex < theHistory.historyEntries.length + 2; theIndex++){

            document.getElementById("journalTable").deleteRow(0);

        }
    }else{

        let row = table.insertRow(0);

        let descriptionCell = row.insertCell(0);

        row = table.insertRow(1);
        descriptionCell.innerHTML = "Grundbuch";
                
        let numberCell = row.insertCell(0);
        let sollCell = row.insertCell(1);
        let sollSumCell = row.insertCell(2);
        let habenCell = row.insertCell(3);
        let habenSumCell = row.insertCell(4);

        numberCell.innerHTML = "Nr.:";
        sollCell.innerHTML = "Sollkonto";
        sollSumCell.innerHTML = "Sollbetrag";
        habenCell.innerHTML = "Habenkonto";
        habenSumCell.innerHTML = "Habenbetrag";

        for(let i = 0; i < theHistory.historyEntries.length; i++){

            let row = table.insertRow(journalNumber + 1);
    
            let numberCell = row.insertCell(0);
            let sollCell = row.insertCell(1);
            let sollSumCell = row.insertCell(2);
            let habenCell = row.insertCell(3);
            let habenSumCell = row.insertCell(4);
    
            numberCell.innerHTML = journalNumber;
            sollCell.innerHTML= theHistory.historyEntries[i].sollName;
            sollSumCell.innerHTML = theHistory.historyEntries[i].sollSum;
            habenCell.innerHTML = theHistory.historyEntries[i].habenName;
            habenSumCell.innerHTML = theHistory.historyEntries[i].habenSum;
    
            journalNumber++;
    
        }

        flag = 1;
    }
}

function newButtonClicked(){

    if(newButtonFlag == 0){

    let table = document.getElementById("newTable");

    let row = table.insertRow(0);

    let sollCell = row.insertCell(0);

    sollCell.innerHTML= "Konto anlegen:";

    row = table.insertRow(1);

    sollCell = row.insertCell(0);
    sollSumCell = row.insertCell(1);

    sollCell.innerHTML = "<input type='text' id='activeTable'>";
    sollSumCell.innerHTML = "<button id='newActiveTable'type='button' class='btn btn-default'>Aktiv</button>";

    row = table.insertRow(2);

    sollCell = row.insertCell(0);
    sollSumCell = row.insertCell(1);

    sollCell.innerHTML = "<input type='text' id='passiveTable'>";
    sollSumCell.innerHTML = "<button id='newActiveTable'type='button' class='btn btn-default'>Passiv</button>";

    row = table.insertRow(3);

    sollCell = row.insertCell(0);
    sollSumCell = row.insertCell(1);

    sollCell.innerHTML = "<input type='text' id='aufwandTable'>";
    sollSumCell.innerHTML = "<button id='newActiveTable'type='button' class='btn btn-default'>Aufwand</button>";

    row = table.insertRow(4);

    sollCell = row.insertCell(0);
    sollSumCell = row.insertCell(1);

    sollCell.innerHTML = "<input type='text' id='ertragTable'>";
    sollSumCell.innerHTML = "<button id='newActiveTable'type='button' class='btn btn-default'>Ertrag</button>";

    row = table.insertRow(5);

    sollCell = row.insertCell(0);

    sollCell.innerHTML= "Konto löschen:";

    row = table.insertRow(6);

    sollCell = row.insertCell(0);
    sollSumCell = row.insertCell(1);

    sollCell.innerHTML = "<input type='text' id='deleteTable'>";
    sollSumCell.innerHTML = "<button id='newActiveTable'type='button' class='btn btn-default'>Löschen</button>";

    newButtonFlag = 1;
}else{

    for(let i = 0; i <= 6; i++){
        document.getElementById("newTable").deleteRow(0);
    }

    newButtonFlag = 0;
}

}

function closingButtonClicked(){

    checkBoxArray = ["Abschluss", "Steuerkonten", "Privatkonten", "Zeitl. Abgrenzung", "EWB/PWB"];

    if(closingButtonFlag == 0){
    let table = document.getElementById("closing");

    let row = table.insertRow(0);

    let sollCell = row.insertCell(0);
    
    sollCell.innerHTML= "Abschlussbuchungen:";

    for(let i = 1; i <=5; i++){

        row = table.insertRow(i);
        let checkBoxName = row.insertCell(0);
        let checkBoxField = row.insertCell(1);

        checkBoxName.innerHTML = checkBoxArray[i-1];
        checkBoxField.innerHTML = "<input type='checkbox' name='closingBox'  value='" + checkBoxArray[i] + "'>";
    }
    row = table.insertRow(6);

    let closingText = row.insertCell(0);
    let checkButton = row.insertCell(1);
    
    closingText.innerHTML= "Inventurbestand einbuchen und erneut Abschluss drücken:";
    checkButton.innerHTML= "<button id='abschluss' type='button' class='btn btn-default'>Ja</button>";
        
    closingButtonFlag = 1;

    }else{

        for(let i = 0; i <= 6; i++){
            document.getElementById("closing").deleteRow(0);
        }
    
        closingButtonFlag = 0;
    }
}