function validateEntry(theEntry){

    //Generelle Prüfung
    //Wenn die Summen nicht stimmen gib ne Fehlermeldung aus und schreibs ins Protokoll
    if(checkSum(theEntry) == false){
        return false;
    }
    
    //Wenn Soll oder Haben 0 ist gib ne Fehlermeldung ...
    if (checkNull(theEntry) == false){
        return false;
    }
    // Prüfen dass Soll und Habenkonto nicht dasselbe sind
    if (checkName(theEntry) == false){
        return false;
    } 

    //Eröffnungsbuchung Prüfung

    if(checkAccounting == 0){
        //Prüfen ob Soll oder Haben SBK oder GUV ist 
        if(checkForSbkGuv(theEntry) == false){
            return false;
        }
        // Eingangsbuchungen müssen in das EBK
        if(checkEbkEntry(theEntry) == false){
            return false;
        }
        // Wenn EBK angesprochen wird prüfen ob das Konto bereits auf EBK gebucht hat
        if(checkEbkAccounting(theEntry) == false){
            return false;
        }
    }

    //Bei laufenden Buchungen
    else if(checkAccounting == 1){
    //Nur bei Eröffnungsbuchung darf an EBK gebucht werden
    if(checkForEbk(theEntry) == false){
        return false;
    }
    //Wenn das Konto nicht existiert (Soll oder Haben) Fehlermeldung
    if(checkAccount(theEntry) == false){
        return false;
    }
    //Buchung darf nicht an Ertrags oder Aufwandskonto gehen
    if(checkForIncExpAcc(theEntry) == false){
        return false;
    }
    }

    //Abschlussbuchungen
    else if(checkAccounting == 2){
    //Wenn Richtung GuV gebucht wurde prüfen ob EBK oder SBK dabei sind
    if(checkGuv(theEntry) == false){
        return false;
    }
    //Prüfen nach Aufwand und Ertragskonten
    if(checkGuvAccounting(theEntry) == false){
        return false;
    }
    //Prüfen ob im Haben SBK und im Soll Warenbestand gebucht ist
    if(checkSbkWare(theEntry) == false){
        return false;
    }
    //Prüfen ob nach Warenaufwand und Warenbestand (Reihenfolge egal) gebucht wurde
    if(checkAufwandBestand(theEntry) == false){
        return false;
    }
    //Prüfen ob das SBK angesprochen wurde
    if(checkSBK(theEntry) == false){
        return false;
    }
    }
} 

function checkSum(theEntry){

//Eintrag ins Protokoll bei Fehler
    if(theEntry.sollSum != theEntry.habenSum){
        console.log("Beide Zahlen müssen übereinstimmen");
        return false;
    }

}

function checkNull(theEntry){

    //Eintrag ins Protokoll bei Fehler
    if(theEntry.sollSum == 0 || theEntry.habenSum == 0){
        console.log("Keine Buchung darf Null sein")
        return false;
  }

}

function checkName(theEntry){

    //Eintrag ins Protokoll bei Fehler
    if(theEntry.sollName.value == theEntry.habenName.value){
        console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
        return false;
    }

}

function checkEbkEntry(theEntry){

    if(theEntry.sollName.value != "EBK"){
        if(theEntry.habenName.value != "EBK"){
            console.log("Eingangsbuchungen müssen in das EBK");
            return false;
        }
    }
    
}


function checkEbkAccounting(theEntry){

    //Bei Buchung prüfen ob das Konto bereits auf das EBK gebucht hat

}

function checkForSbkGuv(theEntry){

    //Buchung von GUV in SBK oder andersrum ist nicht möglich
    if(theEntry.sollName.value == "EBK"){
        if(theEntry.habenName.value == "guv" ||theEntry.habenName.value == "SBK"){
            console.log("Eingangsbuchungen dürfen nicht in das GuV oder SBK");
            return false;
        }
    
    }else if(theEntry.habenName.value == "EBK"){
        if(theEntry.sollName.value == "guv" || theEntry.sollName.value == "SBK"){
            console.log("Eingangsbuchungen dürfen nicht in das GuV oder SBK")
            return false;
        }
    } 

}

function checkForEbk(theEntry){

    if(theEntry.sollName.value == "EBK"){
        if(theEntry.habenName.value == "EBK"){
            console.log("Eingangsbuchungen müssen in das EBK");
            return false;
        }
    }
}

function checkAccount(theEntry){
    //Suche nach Bereits vorhandenen Konten, wenn es keine gibt Fehlermeldung!

    let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
    let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);

    if(sollAccount == null){
        console.log("Fehler. Konto muss existieren.")
        return false;
    }else if(habenAccount == null){
        console.log("Fehler. Haben Konto muss existieren.")
        return false;
    }

}

function checkForIncExpAcc(theEntry){

}

function checkGuv(theEntry){
    //Buchung gegen EBK / SBK nicht möglich bei Guv
    if(theEntry.sollName.value == "guv"){
        if(theEntry.habenName.value == "EBK" || theEntry.habenName.value =="SBK"){
            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
            return false;
        }
    }

    if(theEntry.habenName.value == "guv"){
        if(theEntry.sollName.value == "EBK" ||theEntry.habenName.value == "SBK"){
            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
            return false;
        }
    }
}

function checkGuvAccounting(theEntry){

    //Wenn im Soll GuV gebucht wurde
    if(theEntry.sollName.value == "guv"){

    //Prüfen ob im Haben ein Ertragskonto ist
    //Wenn Ja Fehlermeldung (Abschluss Ertragskonto im Haben nicht möglich)
    //Wenn Nein Prüfen ob es das Habenkonto gibt
    let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
        if(habenAccount == null){
            console.log("Fehler. Haben Konto muss existieren.")
            return false;
        }
    }

    //Wenn im Haben GuV gebucht wurde
    if(theEntry.habenName.value == "guv"){

    //Prüfen ob im Soll ein Aufwanskonto ist
    //Wenn Ja Fehlermeldung(Abschluss Aufwandskonto im Soll nicht möglich)
    //Wenn Nein Prüfen ob es das Sollkonto gibts
    let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
        if(sollAccount == null){
            console.log("Fehler. Konto muss existieren.")
            return false;
        }
    }
}

function checkSbkWare(theEntry){
    //Wenn Warenbestand an SBK gebucht wird Fehlermeldung
    if(theEntry.sollName.value == "Warenbestand" && theEntry.habenName.value == "SBK"){
        console.log("Warenbestand kann nicht an SBK gebucht werden.");
        return false;
    }
    //(Abschluss Warenbestand im Soll nicht möglich)

    if(theEntry.sollName.value == "SBK" && theEntry.habenName.value == "Warenbestand"){
        //Wenn SBK an Ware prüfen ob Warenbestandskonto angelegt wurde
        //Wenn nicht Hinweis das es nicht angelegt ist
        let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
        if(habenAccount == null){
            console.log("Warenbestandskonto muss angelegt werden");
            return false;
        }
        
    }
    
}

function checkAufwandBestand(theEntry){
    //Wenn Konten schon vorhanden sind Buchen
    //Wenn nicht Hinweis (Fehlendes Konto)
}

function checkSBK(theEntry){
    //Wenn SBK im Soll gebucht wurde
    if(theEntry.sollName.value == "SBK"){
        //Prüfen ob das Habenkonto existiert und nicht Warenbestand ist
        let habenAccount = registeredAccounts.find(account => account.theAccountId === theEntry.habenName);
        if(habenAccount == null || habenAccount == "Warenbestand"){
            console.log("Fehler beim Habenkonto.");
            return false;
        }

    }else if(theEntry.habenName.value == "SBK"){
        //Wenn SBK im Haben gebucht wurde
        //Prüfen ob das Sollkonto existiert
        let sollAccount = registeredAccounts.find(account => account.theAccountId === theEntry.sollName);
        if(sollAccount == null){
            console.log("Fehler im Sollkonto.");
            return false;
        }
    }   
}