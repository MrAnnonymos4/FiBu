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


    if (validateEntry(theEntry)) {
        theEntry.post();
        history.addEntryToHistory(theEntry);
    }

    //theEntry.postSubEntries();




    //if (validateEntry(theEntry) == false) {

    //   console.log("Fehler nach der Ausführung");

    //}else{



    

    ////Werte werden aus dem Inputfeld gelöscht sobald buchenButton geklickt wurde
    ////document.getElementById('sollName').value = '';
    ////document.getElementById('sollSum').value = '';
    ////document.getElementById('habenName').value = '';
    ////document.getElementById('habenSum').value = '';

    //}

}



function newButtonClicked() {
    if (document.getElementById("createNewAccountWindow").style.visibility == "hidden") {
        document.getElementById("createNewAccountWindow").style.visibility = "visible";
    } else {
        document.getElementById("createNewAccountWindow").style.visibility = "hidden";
    }
}

function newAktivAccountButtonClicked() {
    let newAccountName = document.getElementById("newAktivAccountName").value.toUpperCase();
    if (registeredAccounts.find(account => account.theAccountId === newAccountName) == null) {
        new Account(newAccountName, "aktiv");
    }
}

function newPassivAccountButtonClicked() {
    let newAccountName = document.getElementById("newPassivAccountName").value.toUpperCase();
    if (registeredAccounts.find(account => account.theAccountId === newAccountName) == null) {
        new Account(newAccountName, "passiv");
    }
}

function newAufwandAccountButtonClicked() {
    let newAccountName = document.getElementById("newAufwandAccountName").value.toUpperCase();
    if (registeredAccounts.find(account => account.theAccountId === newAccountName) == null) {
        new Account(newAccountName, "aufwand");
    }
}

function newErtragAccountButtonClicked() {
    let newAccountName = document.getElementById("newErtragAccountName").value.toUpperCase();
    if (registeredAccounts.find(account => account.theAccountId === newAccountName) == null) {
        new Account(newAccountName, "ertrag");
    }
}

function deleteAccountButtonClicked() {
    let newAccountName = document.getElementById("deleteAccountName").value.toUpperCase();
    let accountToDelete = registeredAccounts.find(account => account.theAccountId === newAccountName);
    if (accountToDelete != null) {
        accountToDelete.deleteAccount();
    } else {
        handleError("Löschen nicht möglich, Account existiert nicht");
    }
}

function closingButtonClicked() {

    if (accountingStatus == 0) {
        if (validateEBKSumForClosing()) {
            //closeEBK();
            
            //Splitbuchungen deaktivieren
            document.getElementById("splitButton").disabled = true;
            accountingStatus = 1;
            console.log(accountingStatus);
        } else {
            alert("Summen des EBK's stimmen nicht überein!");
        }
    } else if (accountingStatus == 1){
        //Anzeige: Wurden alle notwendigen Buchungen durchgeführt?

        new Account("SBK", "SBK");
        new Account("GUV", "GUV");

        
        
        accountingStatus = 2;
        console.log(accountingStatus);
    }


    //checkBoxArray = ["Abschluss", "Steuerkonten", "Privatkonten", "Zeitl. Abgrenzung", "EWB/PWB"];

    //if (closingButtonFlag == 0) {

    //    //Summe Soll EBK == Summe Haben EBK

    //    let getEBK = registeredAccounts.find(account => account.theAccountId === "EBK");

    //    if (getEBK.habenSum != getEBK.sollSum) {

    //        console.log("Fehler, das EBK muss auf Soll und haben gleich sein")
    //        return false;
    //    }

    //    closingButtonFlag = 1;

    //} else if (closingButtonFlag == 1) {

    //    let check = confirm("Sind die vorbereitenden Abschlussbuchungen durchgeführt?");
    //    if (check == false) {
    //        return false;
    //    }

    //    //GUV und SBK anlegen
    //    closingButtonFlag = 2;

    //    //Split Buchungen nicht möglich

    //}


    //if (closingButtonFlag == 0) {
    //    let table = document.getElementById("closing");

    //    let row = table.insertRow(0);

    //    let sollCell = row.insertCell(0);

    //    sollCell.innerHTML = "Abschlussbuchungen:";

    //    for (let i = 1; i <= 5; i++) {

    //        row = table.insertRow(i);
    //        let checkBoxName = row.insertCell(0);
    //        let checkBoxField = row.insertCell(1);

    //        checkBoxName.innerHTML = checkBoxArray[i - 1];
    //        checkBoxField.innerHTML = "<input type='checkbox' name='closingBox'  value='" + checkBoxArray[i] + "'>";
    //    }
    //    row = table.insertRow(6);

    //    let closingText = row.insertCell(0);
    //    let checkButton = row.insertCell(1);

    //    closingText.innerHTML = "Inventurbestand einbuchen und erneut Abschluss drücken:";
    //    checkButton.innerHTML = "<button id='abschluss' type='button' class='btn btn-default'>Ja</button>";



    //} else {

    //    for (let i = 0; i <= 6; i++) {
    //        //document.getElementById("closing").deleteRow(0);
    //    }

    //    closingButtonFlag = 0;
    //}
}
