// JavaScript source code
//function newAside(insertIntoDivId) {
//    let insertIntoDiv = document.getElementById(insertIntoDivId);
//    let newDivId = "aside" + (countAsides() + 1);
//    let theElement = document.createElement("aside");
//    theElement.classList.add("aside");
//    theElement.id = newDivId;
//    theElement.draggable = true;
//    //theElement.style.offsetTop = insertIntoDiv.offsetTop;
//    document.getElementById(insertIntoDivId).appendChild(theElement);
//    initialize(newDivId);
//    return theElement
//    console.log(theElement);
//}

/*
 * Creates a new T-Account into a new Aside
 */

//let theHistory = new History(1);
//console.log(theHistory);

let registeredAccounts = [];
let thePassiveSideGridster;



function initialize() {
    thePassiveSideGridster = new Grid("passiveSide", "passiveSideGridster2");
}

function buchenButtonClicked() {

    if (document.getElementById("passiveSideGridster2") == null) {
        initialize();
    } else {
        thePassiveSideGridster = document.getElementById("passiveSideGridster");
    }

    let sollName = $("#sollName").val();
    let sollSum= $("#sollSum").val();;
    let habenName = $("#habenName").val();;
    let habenSum = $("#habenSum").val();;
    let theEntry = new Entry(sollName, sollSum, habenName, habenSum);
    //theEntry.post();
}



