class Account {
    constructor(accountName) {
        this.Account = "test";
        this.accountName = accountName;
        this.accountWidget = "test";
        this.accountTable = new Table();

        
        registeredAccounts.push(this);
    }

    getHtml() {

    }

    addEntry(isSoll, anEntry) {
        if (isSoll) {
            addSoll(anEntry)
        } else if (!isSoll) {
            addHaben(anEntry)
        } else {
            throw "Illegal Entry";
        }
    }

    addSoll(anEntry) {
        let theNewData = [{
            sollCount: 1,
            sollEntries: anEntry.sollSum(),
            habenCount: 0,
            habenEntries: 0
        }]
        this.accountTable.appendData(theNewData);
    }

    addHaben(anEntry) {
        let theNewData = [{
            sollCount: "",
            sollEntries: "",
            habenCount: 1,
            habenEntries: anEntry.habenSum()
        }]
        this.accountTable.appendData(theNewData);
    }

    calculateSum(){

    }


}


function getHtml() {

}



function calculateSum() {

}



//$('#table').bootstrapTable({
//    columns: [{
//        field: 'id',
//        title: 'Item ID'
//    }, {
//        field: 'name',
//        title: 'Item Name'
//    }, {
//        field: 'price',
//        title: 'Item Price'
//    }],
//    data: [{
//        id: 1,
//        name: 'Item 1',
//        price: '$1'
//    }, {
//        id: 2,
//        name: 'Item 2',
//        price: '$2'
//    }]
//});
//<div class="limiter">
//    <div class="wrap-table100">
//        <div class="table">
//            <div class="row header">
//                <div class="cell" data-title="sollCount">
//                    #
//                                        </div>
//                <div class="cell" data-title="sollEntries">
//                    Soll
//                                        </div>
//                <div class="cell" data-title="habenCount">
//                    #
//                                        </div>
//                <div class="cell" data-title="habenEntries">
//                    Haben
//                                        </div>
//            </div>

//            <div class="row">
//                <div class="cell" data-title="sollCount">
//                    1
//                                        </div>
//                <div class="cell" data-title="sollEntries">
//                    500
//                                        </div>
//                <div class="cell" data-title="habenCount">

//                </div>
//                <div class="cell" data-title="habenEntries">
//                </div>
//            </div>
//        </div>
//    </div>
//</div>