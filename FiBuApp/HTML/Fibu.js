// JavaScript source code
function newDiv(insertIntoDivId) {
    let newDivId = "aside" + (countAsides() + 1);
    let theElement = document.createElement("aside");
    theElement.classList.add("aside");
    theElement.id = newDivId;
    theElement.draggable = true;
    document.getElementById(insertIntoDivId).appendChild(theElement);
    initialize(newDivId);
    
}

function countAsides() {
    let asideCount = document.getElementsByClassName("aside").length;
    console.log(asideCount);
    return asideCount
}



//onclick="initialize("' + newDivId + '")"
//updateLastClickedAsideId("' + newDivId + '")