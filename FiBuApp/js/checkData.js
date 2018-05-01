function validateEntry(theEntry){

    //Generelle Prüfung

    //Wenn die Summen nicht stimmen gib ne Fehlermeldung aus und schreibs ins Protokoll
    theEntry.checkSum();
    //Wenn Soll oder Haben 0 ist gib ne Fehlermeldung ...
    theEntry.checkNull();
    // Prüfen dass Soll und Habenkonto nicht dasselbe sind
    theEntry.checkName();

    //Eröffnungsbuchung Prüfung

    if(checkEbk == 0){
        //Prüfen ob Soll oder Haben SBK oder GUV ist 
        theEntry.checkForSbkGuv();
        // Eingangsbuchungen müssen in das EBK
        theEntry.checkEbkEntry();
        // Wenn EBK angesprochen wird prüfen ob das Konto bereits auf EBK gebucht hat
        theEntry.checkEbkAccounting();
    }

    //Bei laufenden Buchungen

    //Nur bei Eröffnungsbuchung darf an EBK gebucht werden
    theEntry.checkForEbk();
    //Wenn das Konto nicht existiert (Soll oder Haben) Fehlermeldung
    theEntry.checkAccount();
    //Buchung darf nicht an Ertrags oder Aufwandskonto gehen
    theEntry.checkForIncExpAcc();

    //Abschlussbuchungen

    //Wenn Richtung GuV gebucht wurde prüfen ob EBK oder SBK dabei sind
    theEntry.checkGuv();
    //Prüfen nach Aufwand und Ertragskonten
    theEntry.checkGuvAccounting();

    //Prüfen ob im Haben SBK und im Soll Warenbestand gebucht ist
    theEntry.checkSbkWare();
    //Prüfen ob nach Warenaufwand und Warenbestand (Reihenfolge egal) gebucht wurde
    theEntry.checkAufwandBestand();
    //Prüfen ob das SBK angesprochen wurde
    theEntry.checkSBK();
    
} 

function checkSum(){

    if(theEntry.sollSum != theEntry.habenSum){
        console.log("Beide Zahlen müssen übereinstimmen");
        return false;
    }

}

function checkNull(){

    if(this.sollSum == 0 || this.habenSum == 0){
        console.log("Keine Buchung darf Null sein")
        return false;
  }

}

function checkName(){

    if(this.sollName == this.habenName){
        console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
        return false;
    }

}

function checkEbkEntry(){

    if(this.sollName != "ebk" && this.habenName != "ebk" ){
            console.log("Eingangsbuchungen müssen in das EBK")
            return false;
    }
    
}


function checkEbkAccounting(){

    if(this.sollName == "ebk"){
    
    }else if(this.habenName == "ebk"){

    } 

}

function checkForSbkGuv(){

    //Buchung von GUV in SBK oder andersrum ist nicht möglich

}

function checkForEbk(){

}

function checkAccount(){

}

function checkForIncExpAcc(){

}

function checkGuv(){
    //Buchung gegen EBK / SBK nicht möglich bei Guv
}

function checkGuvAccounting(){

    //Wenn im Soll GuV gebucht wurde
    //Prüfen ob im Haben ein Ertragskonto ist
    //Wenn Ja Fehlermeldung (Abschluss Ertragskonto im Haben nicht möglich)
    //Wenn Nein Prüfen ob es das Habenkonto gibt

    //Wenn im Haben GuV gebucht wurde
    //Prüfen ob im Soll ein Aufwanskonto ist
    //Wenn Ja Fehlermeldung(Abschluss Aufwandskonto im Soll nicht möglich)
    //Wenn Nein Prüfen ob es das Sollkonto gibts
}

function checkSbkWare(){
    //Wenn Warenbestand an SBK gebucht wird Fehlermeldung 
    //(Abschluss Warenbestand im Soll nicht möglich)

    //Wenn SBK an Ware prüfen ob Warenbestandskonto angelegt wurde
    //Wenn nicht Hinweis das es nicht angelegt ist
}

function checkAufwandBestand(){
    //Wenn Konten schon vorhanden sind Buchen
    //Wenn nicht Hinweis (Fehlendes Konto)
}

function checkSBK(){
    //Wenn SBK im Soll gebucht wurde
        //Prüfen ob das Habenkonto existiert und nicht Warenbestand ist
    
    //Wenn SBK im Haben gebucht wurde
        //Prüfen ob das Sollkonto existiert
}