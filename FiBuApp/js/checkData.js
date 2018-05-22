function validateEntry(theEntry) {

    //Eröffnungsbuchungen
    if (accountingStatus == 0) {
        return eroeffnungsBuchungenEntryValidation(anEntry);
    }

    //Laufende Buchungen
    if (accountingStatus == 1) {
        return laufendeBuchungenEntryValidation(anEntry);
    }

    //Abschlussbuchungen
    if (accountingStatus == 2) {
        return abschlussBuchungenEntryValidation(anEntry);
    }
} 

function generalEntryValidation(anEntry) {

    //Wenn die Summen nicht stimmen gib ne Fehlermeldung aus und schreibs ins Protokoll
    if (anEntry.sollSum != anEntry.habenSum) {
        //Fehlermeldung: Summen stimmen nicht überein
        return false;
    }

    //Wenn Soll oder Haben 0 ist gib ne Fehlermeldung ...
    if (anEntry.sollSum == 0 || anEntry.habenSum == 0) {
        return false;
        //Fehlermeldung: Keine Nullbuchungen erlaubt
    }

    // Prüfen dass Soll und Habenkonto nicht dasselbe sind
    if (anEntry.sollName == anEntry.habenName) {
        return false;
        //Fehlermeldung: Soll- und Habenkonto können nicht dasselbe sein
    }

    return true;
}

function eroeffnungsBuchungenEntryValidation(anEntry) {

    generalEntryValidation(anEntry);

    //Prüfen ob Konto bereits auf EBK gebucht hat
    if (checkIfAccountHasBookedOnEBK(theEntry)) {
        return false;
        //Fehlermeldung: Konto hat bereits auf EBK gebucht
    }

    //Prüfen ob Buchung auf oder von EBK kommt
    if (anEntry.sollName != "EBK" && anEntry.habenName != "EBK") {
        return false;
        //Fehlermeldung: Buchung ist keine Eröffnungsbuchung
    }

    //Prüfen ob SBK oder GUV in Buchung enthalten ist
    if (checkForSbkOrGuv(anEntry)) {
        return false;
        //Fehlermeldung: Eröffnungsbuchung mit GUV oder SBK nicht möglich
    }

    //Überprüfe ob nicht EBK Soll-Konto bereits existiert
    if (anEntry.sollName != "EBK") {
        if (checkIfAccountExists(anEntry.sollName)) {
            return false;
            //Fehlermeldung: Sollkonto bereits angelegt
        }
    }

    //Überprüfe ob nicht EBK Soll-Konto bereits existiert
    if (anEntry.habenName != "EBK") {
        if (checkIfAccountExists(anEntry.habenName)) {
            return false;
            //Fehlermeldung: Sollkonto bereits angelegt
        }
    }

    return true;
}

function laufendeBuchungenEntryValidation(anEntry) {

    generalEntryValidation(anEntry);

    //Überprüfe ob Buchung EBK enthält
    if (anEntry.sollName == "EBK" || anEntry.habenName == "EBK") {
        //Fehlermeldung: Buchung nicht möglich, EBK bereits abgeschlossen
        return false;
    }

    //Überprüfe ob Sollkonto existiert
    if (!checkIfAccountExists(anEntry.sollName)) {
        //Fehlermeldung: Sollkonto muss erst angelegt werden
        return false;
    }

    //Überprüfe ob Habenkonto existiert
    if (!checkIfAccountExists(anEntry.habenName)) {
        //Fehlermeldung: Sollkonto muss erst angelegt werden
        return false;
    }

    //Überprüfe ob Auftrag an Ertrag oder andersrum buchen soll
    if ((checkIfAccountIsOfType(anEntry.sollName, "aufwand") && checkIfAccountIsOfType(anEntry.habenName, "ertrag")) || (checkIfAccountIsOfType(anEntry.sollName, "ertrag") && checkIfAccountIsOfType(anEntry.habenName, "aufwand"))) {
        //Fehlermeldung: Buchung nicht möglich
        return false;
    }

    //Überprüfe ob Auftrag an Ertrag oder andersrum buchen soll
    if ((checkIfAccountIsOfType(anEntry.habenName, "aufwand") && checkIfAccountIsOfType(anEntry.sollName, "ertrag")) || (checkIfAccountIsOfType(anEntry.habenName, "ertrag") && checkIfAccountIsOfType(anEntry.sollName, "aufwand"))) {
        //Fehlermeldung: Buchung nicht möglich
        return false;
    }

    return true;
}

function abschlussBuchungenEntryValidation(anEntry) {

    generalEntryValidation(anEntry);

    //Überprüfe ob GUV gegen EBK oder SBK gebucht wurde
    if (anEntry.sollName == "GUV" || anEntry.habenName == "GUV") {
        if ((anEntry.sollName == "SBK" || anEntry.sollName == "EBK") || (anEntry.habenName == "SBK" || anEntry.habenName == "EBK")) {
            //Fehlermeldung: Buchung gegen SBK oder EBK nicht möglich
            return false;
        } 

        //Überprüfe ob Sollkonto existiert
        if (!checkIfAccountExists(anEntry.sollName)) {
            //Fehlermeldung: Sollkonto existiert nicht
            return false;
        }

        //Überprüfe ob Habenkonto existiert
        if (!checkIfAccountExists(anEntry.habenName)) {
            //Fehlermeldung: Habenkonto existiert nicht
            return false;
        }

        //Überprüfe ob im Soll ein Aufwandskonto gebucht wurde
        if (checkIfAccountIsOfType(anEntry.sollName, "aufwand")) {
            //Fehlermeldung: Aufwandskonto im Soll nicht möglich
            return false;
        }

        //Überprüfe ob im Haben ein Ertragskonto gebucht wurde
        if (checkIfAccountIsOfType(anEntry.habenName, "ertrag")) {
            //Fehlermeldung: Ertragskonto im Haben nicht möglich
            return false;
        }

    } else {
        //Wenn GUV weder in Soll noch Haben gebucht wurde:

        //Überprüfe ob im Haben SBK und im Soll Warenbestand gebucht wurde
        if (anEntry.habenName == "SBK" && anEntry.sollName == "Warenbestand") {
            //Fehlermeldung: Abschluss Warenbestand im Soll nicht möglich
            return false;
        }

        //Überprüfe ob im Soll SBK und im Haben Warenbestand gebucht wurde
        if (anEntry.sollName == "SBK" && anEntry.habenName == "Warenbestand") {

            //Überprüfe ob Warenbestandskonto nicht angelegt wurde
            if (!checkIfAccountExists("Warenbestand")) {
                //Fehlermeldung: Warenbestandskonto existiert nicht
                return false;
            }
        }

        //Überprüfe ob im Soll Warenaufwand und im Haben Warenbestand gebucht wurde
        if (anEntry.sollName == "Warenaufwand" && anEntry.habenName == "Warenbestand") {

            //Überprüfe ob Konten existieren
            if (!checkIfAccountExists(anEntry.sollName)) {
                //Fehlermeldung: Sollkonto existiert nicht
                return false;
            }
            if (!checkIfAccountExists(anEntry.habenName)) {
                //Fehlermeldung: Habenkonto existiert nicht
                return false;
            }
        }

        //Überprüfe ob im Soll Warenbestand und im Haben Warenaufwand gebucht wurde
        if (anEntry.sollName == "Warenbestand" && anEntry.habenName == "Warenaufwand") {

            //Überprüfe ob Konten existieren
            if (!checkIfAccountExists(anEntry.sollName)) {
                //Fehlermeldung: Sollkonto existiert nicht
                return false;
            }
            if (!checkIfAccountExists(anEntry.habenName)) {
                //Fehlermeldung: Habenkonto existiert nicht
                return false;
            }
        }

        //Überprüfe ob im Soll SBK gebucht wurde
        if (anEntry.sollName == "SBK") {

            //Überprüfe ob Habenkonto nicht Warenbestand ist
            if (anEntry.habenName == "Warenbestand") {
                //Fehlermeldung: Warenbestand darf hier nicht im Haben gebucht werden
                return false;
            }

            //Überprüfe ob Habenkonto existiert
            if (!checkIfAccountExists(anEntry.habenName)) {
                //Fehlermeldung: Habenkonto existiert nicht
                return false;
            }

        }

        //Überprüfe ob im Haben SBK gebucht wurde
        if (anEntry.habenName == "SBK") {

            //Überprüfe ob Sollkonto existiert
            if (!checkIfAccountExists(anEntry.sollName)) {
                //Fehlermeldung: Sollkonto existiert nicht
                return false;
            }
        }
    }

    return true;
}

//Überprüfe ob EBK geschlossen werden kann
function validateEBKSumForClosing() {
    let ebkAccount = registeredAccounts[0];
    let ebkSollSum = ebkAccount.getSollSum();
    let ebkHabenSum = ebkAccount.getHabenSum();
    if (ebkSollSum != 0 && ebkHabenSum != 0 && ebkSollSum == ebkHabenSum) {
        return true;
    }
    return false;
}


//Überprüfe ob Account vom mitgegebenen Typ ist
function checkIfAccountIsOfType(accountId, accountType) {
    if (registeredAccounts.find(account => account.theAccountId === accountId).accountType == accountType) {
        return true;
    }   
    return false;
}

//Bei Buchung prüfen ob das Konto bereits auf das EBK gebucht hat
function checkIfAccountHasBookedOnEBK(theEntry){
    for(i = 0; i <= history.historyEntries.length - 1; i++){
        if (theEntry.sollName == history.historyEntries[i].sollName && theEntry.habenName == history.historyEntries[i].habenName) {
            if (theEntry.sollName == "EBK" || theEntry.habenName == "EBK") {
                alert("Dieses Konto hat bereits auf das EBK gebucht.");
                return false;
            }
        } 
    }
    return true;
}

//Überprüfe ob Buchung SBK oder GUV enthält
function checkForSbkOrGuv(theEntry){
    if (theEntry.sollName == "SBK" || anEntry.habenName == "SBK" || theEntry.sollName == "GUV" || theEntry.habenName == "GUV") {
        return true;
    }
    return false;
}

//Überprüfe ob Konto existiert
function checkIfAccountExists(accountId){
    if (registeredAccounts.find(account => account.theAccountId === accountId) == null) {
        return false;
    } else {
        return true;
    }
}

//function checkForEbk(theEntry){
//    //Nur Eröffnungsbuchungen dürfen in das EBK

//    if(theEntry.sollName == "EBK"){
//        console.log("Nur Eröffnungsbuchungen dürfen in das EBK");
//        return false;   
//    }else if(theEntry.habenName == "EBK"){
//        console.log("Nur Eröffnungsbuchungen dürfen in das EBK");
//        return false;
//    }
//}


//function checkIfEntrySollsumAndHabensumAreEqual(theEntry){

////Eintrag ins Protokoll bei Fehler
//    if(theEntry.sollSum != theEntry.habenSum){
//        console.log("Beide Zahlen müssen übereinstimmen");
//        return false;
//    }

//}

//function checkNull(theEntry){

//    //Eintrag ins Protokoll bei Fehler
//    if(theEntry.sollSum == 0 || theEntry.habenSum == 0){
//        console.log("Keine Buchung darf Null sein")
//        return false;
//  }

//}

//function checkName(theEntry){

//    //Eintrag ins Protokoll bei Fehler
//    if(theEntry.sollName == theEntry.habenName){
//        console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
//        return false;
//    }

//}

//Überprüfe ob Buchung eine Eröffnungsbuchung ist
//function checkIfEntryPostsToEBK(theEntry){
//    if(theEntry.sollName != "EBK"){
//        if(theEntry.habenName != "EBK"){
//            console.log("Eingangsbuchungen müssen in das EBK");
//            return false;
//        }
//    } 
//}

//function checkForIncExpAcc(theEntry){

//    //Buchung darf nicht an Aufwands / Ertragskonto gehen
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(theEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag" || registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Aufwands-/ Ertragskonto sein.")
//                return false;
//            }
//        } else if (theEntry.habenName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag" || registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Aufwands-/ Ertragskonto sein.")
//                return false;
//            }
//        }
//    }


//}

//function checkGuv(theEntry){
//    //Buchung gegen EBK / SBK nicht möglich bei Guv
//    if(theEntry.sollName == "GUV"){
//        if(theEntry.habenName == "EBK" || theEntry.habenName =="SBK"){
//            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
//            return false;
//        }
//    }

//    if(theEntry.habenName == "GUV"){
//        if(theEntry.sollName == "EBK" ||theEntry.habenName == "SBK"){
//            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
//            return false;
//        }
//    }
//}

//function checkGuvAccounting(theEntry){

//    //Wenn im Soll GuV gebucht wurde
//    if(theEntry.sollName == "GUV"){

//    //Prüfen ob im Haben ein Ertragskonto ist
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(theEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag"){
//                console.log("Fehler. Konto darf kein Ertragskonto sein.")
//                return false;
//            }
//        }
//    }
//    //Wenn Ja Fehlermeldung (Abschluss Ertragskonto im Haben nicht möglich)
//    //Wenn Nein Prüfen ob es das Habenkonto gibt
//    let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
//        if(habenAccount == null){
//            console.log("Fehler. Haben Konto muss existieren.")
//            return false;
//        }
//    }

//    //Wenn im Haben GuV gebucht wurde
//    if(theEntry.habenName == "GUV"){

//    //Prüfen ob im Soll ein Aufwandskonto ist
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(theEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Ertragskonto sein.")
//                return false;
//            }
//        }
//    }
//    //Wenn Ja Fehlermeldung(Abschluss Aufwandskonto im Soll nicht möglich)
//    //Wenn Nein Prüfen ob es das Sollkonto gibts
//    let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
//        if(sollAccount == null){
//            console.log("Fehler. Konto muss existieren.")
//            return false;
//        }
//    }
//}

//function checkSbkWare(theEntry){
//    //Wenn Warenbestand an SBK gebucht wird Fehlermeldung
//    if(theEntry.sollName == "WARENBESTAND" && theEntry.habenName == "SBK"){
//        console.log("Warenbestand kann nicht an SBK gebucht werden.");
//        return false;
//    }
//    //(Abschluss Warenbestand im Soll nicht möglich)

//    if(theEntry.sollName == "SBK" && theEntry.habenName == "WARENBESTAND"){
//        //Wenn SBK an Ware prüfen ob Warenbestandskonto angelegt wurde
//        //Wenn nicht Hinweis das es nicht angelegt ist
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
//        if(habenAccount == null){
//            console.log("Warenbestandskonto muss angelegt werden");
//            return false;
//        }
        
//    }
    
//}

//function checkAufwandBestand(theEntry){
//    //Prüfen ob die Konten Aufwands oder Bestandskonten 
//    if(theEntry.sollName == "WARENAUFWAND" && theEntry.habenName == "WARENBESTAND" || theEntry.habenName == "WARENAUFWAND" && theEntry.sollName == "WARENAUFWAND"){
        
//        let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);

//        if(sollAccount == null ||habenAccount == null){
//            console.log("Fehler in einem der beiden Konten.");
//            return false;
//        }
//    }
//    //Wenn Konten schon vorhanden sind Buchen
//    //Wenn nicht Hinweis (Fehlendes Konto)
//}

//function checkSbk(theEntry){
//    //Wenn SBK im Soll gebucht wurde
//    if(theEntry.sollName == "SBK"){
//        //Prüfen ob das Habenkonto existiert und nicht Warenbestand ist
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
//        if(habenAccount == null){
//            console.log("Fehler beim Habenkonto.");
//            return false;
//        }

//    }else if(theEntry.habenName == "SBK"){
//        //Wenn SBK im Haben gebucht wurde
//        //Prüfen ob das Sollkonto existiert
//        let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
//        if(sollAccount == null){
//            console.log("Fehler im Sollkonto.");
//            return false;
//        }
//    }   
//}