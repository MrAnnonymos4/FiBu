let registeredAccounts = [];
let history;
let journalNumber = 1;
let flag = 0;
let newButtonFlag = 0;
let closingButtonFlag = 0;
let clientSections = [];
let possibleAccounts = ["Grundstücke", "Maschinen", "Fahrzeuge", "BGA", "Im. Vermögensgegenstände", "Finanzanlagen", "Langfristige Verbindlichkeiten", "EK", "Rückstellungen", "Kasse", "Bank", "Rohstoffe", "Hilfs- Betriebsstoffe", "Unfertige Erzeugnisse"];
let accountingStatus = 0; // 0 = Eröffnungsbuchungen, 1 = Laufende Buchungen, 2 = Abschluss Buchungen

document.addEventListener("DOMContentLoaded", function () {
    initialize();
    setEventListeners();
});

// Setzte EventListeners für Buttons
function setEventListeners() {
    document.getElementById("newAktivAccountButton").addEventListener("click", newAktivAccountButtonClicked);
    document.getElementById("newPassivAccountButton").addEventListener("click", newPassivAccountButtonClicked);
    document.getElementById("newErtragAccountButton").addEventListener("click", newErtragAccountButtonClicked);
    document.getElementById("newAufwandAccountButton").addEventListener("click", newAufwandAccountButtonClicked);
    document.getElementById("deleteAccountButton").addEventListener("click", deleteAccountButtonClicked);
    document.getElementById("closingButton").addEventListener("click", closingButtonClicked);
}


function initialize() {
    history = new History();

    //calculate display sections for account types. 
    let theClientWidth = document.getElementById("accountSpace").clientWidth;
    let temp = 0;
    for (let i = 0; i < 5; i++) {
        temp = temp + (theClientWidth / 5) / 2;
        clientSections.push((theClientWidth / 5) *i);
    }
    new Account("EBK", "ebk");  
}

function alertInfo() {

    alert("Hier folgt die Info zum E-Learning Team");

}


function buchenButtonClicked() {

    let sollName;
    let habenName;
    let sollSum;
    let habenSum;
    let splitSum;
    let subEntries = [];
    let inputRowCount = document.getElementsByClassName("inputRow").length;

    let theEntry = new SplittableEntry($("#sollName" + 1).val().trim().toUpperCase(), parseInt($("#sollSum" + 1).val()), $("#habenName" + 1).val().trim().toUpperCase(), parseInt($("#habenSum" + 1).val()));

    for (let inputFieldNumber = 2; inputFieldNumber <= inputRowCount; inputFieldNumber++) {
        theEntry.split($("#sollName" + inputFieldNumber).val().trim().toUpperCase(), parseInt($("#sollSum" + inputFieldNumber).val()), $("#habenName" + inputFieldNumber).val().trim().toUpperCase(), ($("#habenSum" + inputFieldNumber).val()));
    }
    theEntry.post();
    theEntry.postSubEntries();




    //if (validateEntry(theEntry) == false) {

    //   console.log("Fehler nach der Ausführung");

    //}else{


    
    history.addEntryToHistory(theEntry);

    ////Werte werden aus dem Inputfeld gelöscht sobald buchenButton geklickt wurde
    ////document.getElementById('sollName').value = '';
    ////document.getElementById('sollSum').value = '';
    ////document.getElementById('habenName').value = '';
    ////document.getElementById('habenSum').value = '';

    //}

}

function splitButtonClicked(){

    let table = document.getElementById("inputMask");
    let inputNumber = document.getElementsByClassName("inputRow").length+1;

    if(inputNumber <= 6){

        let row = table.insertRow(inputNumber);

        row.classList.add("inputRow");
        let numberCell = row.insertCell(0);
        let sollCell = row.insertCell(1);
        let sollSumCell = row.insertCell(2);
        let habenCell = row.insertCell(3);
        let habenSumCell = row.insertCell(4);
    
        numberCell.innerHTML = inputNumber;
        sollCell.innerHTML = "<input type='text' id='sollName" + inputNumber + "' > ";
        sollSumCell.innerHTML = "<input type='number' id='sollSum" + inputNumber + "'>";
        habenCell.innerHTML = "<input type='text' id='habenName" + inputNumber + "'>";
        habenSumCell.innerHTML = "<input type='number' id='habenSum" + inputNumber + "'>";

    }
}

function journalButtonClicked(){

    let table = document.getElementById("journalTable");

    if(flag == 1){

        flag = 0;
        journalNumber = 1;

        for(let theIndex = 0; theIndex < history.historyEntries.length + 2; theIndex++){

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

        for(let i = 0; i < history.historyEntries.length; i++){

            let row = table.insertRow(journalNumber + 1);
    
            let numberCell = row.insertCell(0);
            let sollCell = row.insertCell(1);
            let sollSumCell = row.insertCell(2);
            let habenCell = row.insertCell(3);
            let habenSumCell = row.insertCell(4);
    
            numberCell.innerHTML = journalNumber;
            sollCell.innerHTML= history.historyEntries[i].sollName;
            sollSumCell.innerHTML = history.historyEntries[i].sollSum;
            habenCell.innerHTML = history.historyEntries[i].habenName;
            habenSumCell.innerHTML = history.historyEntries[i].habenSum;
    
            journalNumber++;
    
        }

        flag = 1;
    }
}


