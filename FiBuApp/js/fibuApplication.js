
let registeredAccounts = [];
let theMainGridster;
let theHistory;
let inputNumber = 2;
let journalNumber = 1;
let flag = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DomcontentLoaded");
    initialize();
});


function initialize() {
    theMainGridster = new Grid("fibuApplication", "mainGridster");
    theHistory = new History();

    $(".gridster ul").gridster({
        widget_base_dimensions: [300, 300],
        widget_margins: [5, 5],
    });
}


function buchenButtonClicked() {

    let sollName = $("#sollName").val();
    let sollSum= $("#sollSum").val();
    let habenName = $("#habenName").val();
    let habenSum = $("#habenSum").val();
    let theEntry = new Entry(sollName, sollSum, habenName, habenSum);
    theEntry.post();
    theHistory.addEntryToHistory(theEntry);
}

function splitButtonClicked(){

    let table = document.getElementById("inputMask");

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

    inputNumber++;


}

function journalButtonClicked(){

    let theHistory = new History;

    let historyBook = theHistory.getHistory();


    let table = document.getElementById("journalTable");


    if(flag == 1){

        for(let theIndex = 0; theIndex < historyBook.length + 1; theIndex++){

            document.getElementById("journalTable").deleteRow(0);

        }

        journalNumber = 1;
        flag = 0;

    }else{

        let row = table.insertRow(0);

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

        for(let i = 0; i < historyBook.length; i++){

            let row = table.insertRow(journalNumber);
    
            let numberCell = row.insertCell(0);
            let sollCell = row.insertCell(1);
            let sollSumCell = row.insertCell(2);
            let habenCell = row.insertCell(3);
            let habenSumCell = row.insertCell(4);
    
            numberCell.innerHTML = historyBook[i][0];
            sollCell.innerHTML= historyBook[i][1];
            sollSumCell.innerHTML = historyBook[i][2];
            habenCell.innerHTML = historyBook[i][3];
            habenSumCell.innerHTML = historyBook[i][4];
    
            journalNumber++;
    
        }

        flag = 1;
    }
}