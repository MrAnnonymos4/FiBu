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


function newGridsterElement(theGridsterId) {
    let theGridster = $(".gridster ul").gridster().data('gridster');
    let theElement = document.createElement("li");

    theElement.classList.add("yellow");
    theElement.setAttribute("data-col", 1);
    theElement.setAttribute("data-row", countGridsterLiElements(theGridsterId) + 1);
    theElement.setAttribute("data-sizex", 1);
    theElement.setAttribute("data-sizey", 1);

    theGridster.add_widget(theElement);
}
 
function createNewTAccount(insertIntoDiv) {

    let theTable = new StaticList();
    theTable.addRow([1, "test"]);

}
function countGridsterLiElements(theGridsterId) {
    return document.getElementById(theGridsterId).childNodes[1].children.length;
}


//onclick="initialize("' + newDivId + '")"
//updateLastClickedAsideId("' + newDivId + '")