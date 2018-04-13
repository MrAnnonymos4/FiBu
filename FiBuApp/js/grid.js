$(function () { //DOM Ready

    $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [450, 450]
    });

});

function registerNewGrids() {
    $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [300, 300]
    });
    console.log("registered new Grids");
}

function newGrid() {
    var gridster = $(".gridster ul").gridster().data('gridster');
    gridster.add_widget('<li class="new">The HTML of the widget...</li>', 2, 1);
}



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