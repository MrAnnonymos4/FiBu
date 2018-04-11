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