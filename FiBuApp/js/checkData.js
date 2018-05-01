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
    checkForEbk(theEntry);
    //Wenn das Konto nicht existiert (Soll oder Haben) Fehlermeldung
    checkAccount(theEntry);
    //Buchung darf nicht an Ertrags oder Aufwandskonto gehen
    checkForIncExpAcc(theEntry);
    }

    //Abschlussbuchungen
    else if(checkAccounting == 2){
    //Wenn Richtung GuV gebucht wurde prüfen ob EBK oder SBK dabei sind
    checkGuv(theEntry);
    //Prüfen nach Aufwand und Ertragskonten
    checkGuvAccounting(theEntry);
    //Prüfen ob im Haben SBK und im Soll Warenbestand gebucht ist
    checkSbkWare(theEntry);
    //Prüfen ob nach Warenaufwand und Warenbestand (Reihenfolge egal) gebucht wurde
    checkAufwandBestand(theEntry);
    //Prüfen ob das SBK angesprochen wurde
    checkSBK(theEntry);
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
    if(this.sollSum == 0 || this.habenSum == 0){
        console.log("Keine Buchung darf Null sein")
        return false;
  }

}

function checkName(theEntry){

    //Eintrag ins Protokoll bei Fehler
    if(this.sollName.value == this.habenName.value){
        console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
        return false;
    }

}

function checkEbkEntry(theEntry){

    if(this.sollName.value != "ebk"){
        if(this.habenName.value != "ebk"){
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
    if(this.sollName.value == "ebk"){
        if(this.habenName.value == "guv" ||this.habenName.value == "sbk"){
            console.log("Eingangsbuchungen dürfen nicht in das GuV oder SBK");
            return false;
        }
    
    }else if(this.habenName.value == "ebk"){
        if(this.sollName.value == "guv" || this.sollName.value == "sbk"){
            console.log("Eingangsbuchungen dürfen nicht in das GuV oder SBK")
            return false;
        }
    } 

}

function checkForEbk(theEntry){

    if(this.sollName.value == "ebk"){
        if(this.habenName.value == "ebk"){
            console.log("Eingangsbuchungen müssen in das EBK");
            return false;
        }
    }
}

function checkAccount(theEntry){

}

function checkForIncExpAcc(theEntry){

}

function checkGuv(theEntry){
    //Buchung gegen EBK / SBK nicht möglich bei Guv
    if(this.sollName.value == "guv"){
        if(this.habenName.value == "ebk" || this.habenName.value =="sbk"){
            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
            return false;
        }
    }

    if(this.habenName.value == "guv"){
        if(this.sollName.value == "ebk" ||this.habenName.value == "sbk"){
            console.log("Buchungen in das GuV dürfen nicht in das EBK oder SBK");
            return false;
        }
    }
}

function checkGuvAccounting(theEntry){

    //Wenn im Soll GuV gebucht wurde
    //Prüfen ob im Haben ein Ertragskonto ist
    //Wenn Ja Fehlermeldung (Abschluss Ertragskonto im Haben nicht möglich)
    //Wenn Nein Prüfen ob es das Habenkonto gibt

    //Wenn im Haben GuV gebucht wurde
    //Prüfen ob im Soll ein Aufwanskonto ist
    //Wenn Ja Fehlermeldung(Abschluss Aufwandskonto im Soll nicht möglich)
    //Wenn Nein Prüfen ob es das Sollkonto gibts
}

function checkSbkWare(theEntry){
    //Wenn Warenbestand an SBK gebucht wird Fehlermeldung 
    //(Abschluss Warenbestand im Soll nicht möglich)

    //Wenn SBK an Ware prüfen ob Warenbestandskonto angelegt wurde
    //Wenn nicht Hinweis das es nicht angelegt ist
}

function checkAufwandBestand(theEntry){
    //Wenn Konten schon vorhanden sind Buchen
    //Wenn nicht Hinweis (Fehlendes Konto)
}

function checkSBK(theEntry){
    //Wenn SBK im Soll gebucht wurde
        //Prüfen ob das Habenkonto existiert und nicht Warenbestand ist
    
    //Wenn SBK im Haben gebucht wurde
        //Prüfen ob das Sollkonto existiert
}