function validateEntry(anEntry) {

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
        handleError("Summen stimmen nicht überein");
        return false;
    }

    //Wenn Soll oder Haben 0 ist gib ne Fehlermeldung ...
    if (anEntry.sollSum == 0 || anEntry.habenSum == 0) {
        handleError("Keine Nullbuchungen erlaubt");
        return false;
        
    }

    // Prüfen dass Soll und Habenkonto nicht dasselbe sind
    if (anEntry.sollName == anEntry.habenName) {
        handleError("Soll- und Habenkonto können nicht dasselbe sein");
        return false;
        
    }

    return true;
}

function eroeffnungsBuchungenEntryValidation(anEntry) {

    if (!generalEntryValidation(anEntry)) {
        return false;
    }

    //Prüfen ob Konto bereits auf EBK gebucht hat
    if (checkIfAccountHasBookedOnEBK(anEntry)) {
        handleError("Konto hat bereits auf EBK gebucht");
        return false;
        
    }

    //Prüfen ob Buchung auf oder von EBK kommt
    if (anEntry.sollName != "EBK" && anEntry.habenName != "EBK") {
        handleError("Buchung ist keine Eröffnungsbuchung");
        return false;
        
    }

    //Prüfen ob SBK oder GUV in Buchung enthalten ist
    if (checkForSbkOrGuv(anEntry)) {
        handleError("Eröffnungsbuchung mit GUV oder SBK nicht möglich");
        return false;
        
    }

    //Überprüfe ob nicht EBK Soll-Konto bereits existiert
    if (anEntry.sollName != "EBK") {
        if (checkIfAccountExists(anEntry.sollName)) {
            handleError("Sollkonto bereits angelegt");
            return false;
            
        }
    }

    //Überprüfe ob nicht EBK Soll-Konto bereits existiert
    if (anEntry.habenName != "EBK") {
        if (checkIfAccountExists(anEntry.habenName)) {
            handleError("Sollkonto bereits angelegt");
            return false;
            
        }
    }
    clearError();
    return true;
}

function laufendeBuchungenEntryValidation(anEntry) {

    if (!generalEntryValidation(anEntry)) {
        return false;
    }

    //Überprüfe ob Buchung EBK enthält
    if (anEntry.sollName == "EBK" || anEntry.habenName == "EBK") {
        handleError("Buchung nicht möglich, EBK bereits abgeschlossen");
        return false;
    }

    //Überprüfe ob Sollkonto existiert
    if (!checkIfAccountExists(anEntry.sollName)) {
        handleError("Sollkonto muss erst angelegt werden");
        return false;
    }

    //Überprüfe ob Habenkonto existiert
    if (!checkIfAccountExists(anEntry.habenName)) {
        handleError("Habenkonto muss erst angelegt werden");
        return false;
    }

    //Überprüfe ob Auftrag an Ertrag oder andersrum buchen soll
    if ((checkIfAccountIsOfType(anEntry.sollName, "aufwand") && checkIfAccountIsOfType(anEntry.habenName, "ertrag")) || (checkIfAccountIsOfType(anEntry.sollName, "ertrag") && checkIfAccountIsOfType(anEntry.habenName, "aufwand"))) {
        handleError("Buchung nicht möglich");
        return false;
    }

    //Überprüfe ob Auftrag an Ertrag oder andersrum buchen soll
    if ((checkIfAccountIsOfType(anEntry.habenName, "aufwand") && checkIfAccountIsOfType(anEntry.sollName, "ertrag")) || (checkIfAccountIsOfType(anEntry.habenName, "ertrag") && checkIfAccountIsOfType(anEntry.sollName, "aufwand"))) {
        handleError("Buchung nicht möglich");
        return false;
    }

    clearError();
    return true;
}

function abschlussBuchungenEntryValidation(anEntry) {

    if (!generalEntryValidation(anEntry)) {
        return false;
    }

    //Überprüfe ob GUV gegen EBK oder SBK gebucht wurde
    if (anEntry.sollName == "GUV" || anEntry.habenName == "GUV") {
        if ((anEntry.sollName == "SBK" || anEntry.sollName == "EBK") || (anEntry.habenName == "SBK" || anEntry.habenName == "EBK")) {
            handleError("Buchung gegen SBK oder EBK nicht möglich");
            return false;
        } 

        //Überprüfe ob Sollkonto existiert
        if (!checkIfAccountExists(anEntry.sollName)) {
            handleError("Sollkonto existiert nicht");
            return false;
        }

        //Überprüfe ob Habenkonto existiert
        if (!checkIfAccountExists(anEntry.habenName)) {
            handleError("Habenkonto existiert nicht");
            return false;
        }

        //Überprüfe ob im Soll ein Aufwandskonto gebucht wurde
        if (checkIfAccountIsOfType(anEntry.sollName, "aufwand")) {
            handleError("Aufwandskonto im Soll nicht möglich");
            return false;
        }

        //Überprüfe ob im Haben ein Ertragskonto gebucht wurde
        if (checkIfAccountIsOfType(anEntry.habenName, "ertrag")) {
            handleError("Ertragskonto im Haben nicht möglich");
            return false;
        }

    } else {
        //Wenn GUV weder in Soll noch Haben gebucht wurde:

        //Überprüfe ob im Haben SBK und im Soll WARENBESTAND gebucht wurde
        if (anEntry.habenName == "SBK" && anEntry.sollName == "WARENBESTAND") {
            handleError("Abschluss WARENBESTAND im Soll nicht möglich");
            return false;
        }

        //Überprüfe ob im Soll SBK und im Haben WARENBESTAND gebucht wurde
        if (anEntry.sollName == "SBK" && anEntry.habenName == "WARENBESTAND") {

            //Überprüfe ob WARENBESTANDskonto nicht angelegt wurde
            if (!checkIfAccountExists("WARENBESTAND")) {
                handleError("WARENBESTANDskonto existiert nicht");
                return false;
            }
        }

        //Überprüfe ob im Soll WARENAUFWAND und im Haben WARENBESTAND gebucht wurde
        if (anEntry.sollName == "WARENAUFWAND" && anEntry.habenName == "WARENBESTAND") {

            //Überprüfe ob Konten existieren
            if (!checkIfAccountExists(anEntry.sollName)) {
                handleError("Sollkonto existiert nicht");
                return false;
            }
            if (!checkIfAccountExists(anEntry.habenName)) {
                handleError("Habenkonto existiert nicht");
                return false;
            }
        }

        //Überprüfe ob im Soll WARENBESTAND und im Haben WARENAUFWAND gebucht wurde
        if (anEntry.sollName == "WARENBESTAND" && anEntry.habenName == "WARENAUFWAND") {

            //Überprüfe ob Konten existieren
            if (!checkIfAccountExists(anEntry.sollName)) {
                handleError("Sollkonto existiert nicht");
                return false;
            }
            if (!checkIfAccountExists(anEntry.habenName)) {
                handleError("Habenkonto existiert nicht");
                return false;
            }
        }

        //Überprüfe ob im Haben SBK gebucht wurde
        if (anEntry.habenName == "SBK") {

            //Überprüfe ob Soll nicht WARENBESTAND ist
            if (anEntry.sollName == "WARENBESTAND") {
                handleError("WARENBESTAND darf hier nicht im Haben gebucht werden");
                return false;
            }

            //Überprüfe ob Habenkonto existiert
            if (!checkIfAccountExists(anEntry.habenName)) {
                handleError("Habenkonto existiert nicht");
                return false;
            }

        }

        //Überprüfe ob im Soll SBK gebucht wurde
        if (anEntry.sollName == "SBK") {

            //Überprüfe ob Sollkonto existiert
            if (!checkIfAccountExists(anEntry.habenName)) {
                handleError("Sollkonto existiert nicht");
                return false;
            }
        }
    }

    clearError();
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
function checkIfAccountHasBookedOnEBK(anEntry){
     if (checkIfAccountExists(anEntry.sollName) && checkIfAccountExists(anEntry.habenName)) {
        return true;
    }
    return false;
}

//Überprüfe ob Buchung SBK oder GUV enthält
function checkForSbkOrGuv(anEntry){
    if (anEntry.sollName == "SBK" || anEntry.habenName == "SBK" || anEntry.sollName == "GUV" || anEntry.habenName == "GUV") {
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

function handleError(anErrorString) {
    console.log(anErrorString);
    document.getElementById("errorDiv").innerHTML = anErrorString;
}

function clearError() {
    document.getElementById("errorDiv").innerHTML = "";
}

//function checkForEbk(anEntry){
//    //Nur Eröffnungsbuchungen dürfen in das EBK

//    if(anEntry.sollName == "EBK"){
//        console.log("Nur Eröffnungsbuchungen dürfen in das EBK");
//        return false;   
//    }else if(anEntry.habenName == "EBK"){
//        console.log("Nur Eröffnungsbuchungen dürfen in das EBK");
//        return false;
//    }
//}


//function checkIfEntrySollsumAndHabensumAreEqual(anEntry){

////Eintrag ins Protokoll bei Fehler
//    if(anEntry.sollSum != anEntry.habenSum){
//        console.log("Beide Zahlen müssen übereinstimmen");
//        return false;
//    }

//}

//function checkNull(anEntry){

//    //Eintrag ins Protokoll bei Fehler
//    if(anEntry.sollSum == 0 || anEntry.habenSum == 0){
//        console.log("Keine Buchung darf Null sein")
//        return false;
//  }

//}

//function checkName(anEntry){

//    //Eintrag ins Protokoll bei Fehler
//    if(anEntry.sollName == anEntry.habenName){
//        console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
//        return false;
//    }

//}

//Überprüfe ob Buchung eine Eröffnungsbuchung ist
//function checkIfEntryPostsToEBK(anEntry){
//    if(anEntry.sollName != "EBK"){
//        if(anEntry.habenName != "EBK"){
//            console.log("Eingangsbuchungen müssen in das EBK");
//            return false;
//        }
//    } 
//}

//function checkForIncExpAcc(anEntry){

//    //Buchung darf nicht an Aufwands / Ertragskonto gehen
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(anEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag" || registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Aufwands-/ Ertragskonto sein.")
//                return false;
//            }
//        } else if (anEntry.habenName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag" || registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Aufwands-/ Ertragskonto sein.")
//                return false;
//            }
//        }
//    }


//}

//function checkGuv(anEntry){
//    //Buchung gegen EBK / SBK nicht möglich bei Guv
//    if(anEntry.sollName == "GUV"){
//        if(anEntry.habenName == "EBK" || anEntry.habenName =="SBK"){
//            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
//            return false;
//        }
//    }

//    if(anEntry.habenName == "GUV"){
//        if(anEntry.sollName == "EBK" ||anEntry.habenName == "SBK"){
//            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
//            return false;
//        }
//    }
//}

//function checkGuvAccounting(anEntry){

//    //Wenn im Soll GuV gebucht wurde
//    if(anEntry.sollName == "GUV"){

//    //Prüfen ob im Haben ein Ertragskonto ist
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(anEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "ertrag"){
//                console.log("Fehler. Konto darf kein Ertragskonto sein.")
//                return false;
//            }
//        }
//    }
//    //Wenn Ja Fehlermeldung (Abschluss Ertragskonto im Haben nicht möglich)
//    //Wenn Nein Prüfen ob es das Habenkonto gibt
//    let habenAccount = registeredAccounts.find(account => account.theAccountId === anEntry.habenName);
//        if(habenAccount == null){
//            console.log("Fehler. Haben Konto muss existieren.")
//            return false;
//        }
//    }

//    //Wenn im Haben GuV gebucht wurde
//    if(anEntry.habenName == "GUV"){

//    //Prüfen ob im Soll ein Aufwandskonto ist
//    for(i = 0;  i <= registeredAccounts.length; i++){
//        if(anEntry.sollName == registeredAccounts[i].theAccountId){
//            if(registeredAccounts[i].accountType == "aufwand"){
//                console.log("Fehler. Konto darf kein Ertragskonto sein.")
//                return false;
//            }
//        }
//    }
//    //Wenn Ja Fehlermeldung(Abschluss Aufwandskonto im Soll nicht möglich)
//    //Wenn Nein Prüfen ob es das Sollkonto gibts
//    let sollAccount = registeredAccounts.find(account => account.theAccountId === anEntry.sollName);
//        if(sollAccount == null){
//            console.log("Fehler. Konto muss existieren.")
//            return false;
//        }
//    }
//}

//function checkSbkWare(anEntry){
//    //Wenn WARENBESTAND an SBK gebucht wird Fehlermeldung
//    if(anEntry.sollName == "WARENBESTAND" && anEntry.habenName == "SBK"){
//        console.log("WARENBESTAND kann nicht an SBK gebucht werden.");
//        return false;
//    }
//    //(Abschluss WARENBESTAND im Soll nicht möglich)

//    if(anEntry.sollName == "SBK" && anEntry.habenName == "WARENBESTAND"){
//        //Wenn SBK an Ware prüfen ob WARENBESTANDskonto angelegt wurde
//        //Wenn nicht Hinweis das es nicht angelegt ist
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === anEntry.habenName);
//        if(habenAccount == null){
//            console.log("WARENBESTANDskonto muss angelegt werden");
//            return false;
//        }
        
//    }
    
//}

//function checkAufwandBestand(anEntry){
//    //Prüfen ob die Konten Aufwands oder Bestandskonten 
//    if(anEntry.sollName == "WARENAUFWAND" && anEntry.habenName == "WARENBESTAND" || anEntry.habenName == "WARENAUFWAND" && anEntry.sollName == "WARENAUFWAND"){
        
//        let sollAccount = registeredAccounts.find(account => account.theAccountId === anEntry.sollName);
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === anEntry.habenName);

//        if(sollAccount == null ||habenAccount == null){
//            console.log("Fehler in einem der beiden Konten.");
//            return false;
//        }
//    }
//    //Wenn Konten schon vorhanden sind Buchen
//    //Wenn nicht Hinweis (Fehlendes Konto)
//}

//function checkSbk(anEntry){
//    //Wenn SBK im Soll gebucht wurde
//    if(anEntry.sollName == "SBK"){
//        //Prüfen ob das Habenkonto existiert und nicht WARENBESTAND ist
//        let habenAccount = registeredAccounts.find(account => account.theAccountId === anEntry.habenName);
//        if(habenAccount == null){
//            console.log("Fehler beim Habenkonto.");
//            return false;
//        }

//    }else if(anEntry.habenName == "SBK"){
//        //Wenn SBK im Haben gebucht wurde
//        //Prüfen ob das Sollkonto existiert
//        let sollAccount = registeredAccounts.find(account => account.theAccountId === anEntry.sollName);
//        if(sollAccount == null){
//            console.log("Fehler im Sollkonto.");
//            return false;
//        }
//    }   
//}