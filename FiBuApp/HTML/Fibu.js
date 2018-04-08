// JavaScript source code
function newDiv(insertIntoDivId) {
    let htmlString;
    htmlString = '<aside class="aside" id="aside' + countAsides() + 1 + '" onclick="alert()" draggable=true></aside>';
    document.getElementById(insertIntoDivId).innerHTML = htmlString;
    
}

function countAsides() {
    let asideCount = document.getElementsByTagName("aside").length;
    console.log(asideCount);
    return asideCount
}



