class CheckData{
    constructor(sollName, sollSum, habenName, habenSum){
        this.sollName = sollName;
        this.sollSum = sollSum;
        this.habenName = habenName;
        this.habenSum = habenSum;
    }

    checkSum(){

//Wenn die Summen nicht stimmen gib ne Fehlermeldung aus und schreibs ins Protokoll

        if(this.sollSum != this.habenSum){
            console.log("Beide Zahlen müssen übereinstimmen");
            return false;
        }
//Wenn Soll oder Haben 0 ist gib ne Fehlermeldung ...
        if(this.sollSum == 0 || this.habenSum == 0){
            console.log("Keine Buchung darf Null sein")
            return false;

      }
// Prüfen dass Soll und Habenkonto nicht das selbe sind
        if(this.sollName == this.habenName){
            console.log("Man kann nicht soll und haben auf das gleiche Konto buchen");
            return false;
        }

    }  

//Wenn nur eine Zeile überprüfe nur wenn das EBK noch nicht abgeschlossen ist

    // Wenn Soll oder Haben nicht EBK ist, dann gib ne Fehlermeldung aus

    //Wenn im Soll oder Haben gegen SBK gebucht wurde gib ne Fehlermeldung aus

    //Wenn im Soll oder Haben gegen GUV gebucht wurde gib ne Fehlermeldung aus

    // Wenn nicht im Soll das EBK gebucht wird ist es die Eröffnung eines Aktiven Bestandskonto

    //Prüfe ob das Konto vorhanden ist, wenn nicht, leg es an und buche

    //ansonsten gib ne Fehlermeldung aus, dass es das Konto schon gibt

//Wenn über den Schalter Abschluss die Konten GUV und SBK angelegt sind prüfe

    //Wenn das EBK angesprochen wird brich sofort ab!!

//Wenn im Soll oder Haben GUV gebucht wurde überprüfe, ob nicht irgendwo gegen EBK gebucht wird brich ab

    //Jetzt überprüfe ob nicht gegen SBK gebucht wird

    //Wenn im Soll nicht GUV steht überprüfe ob das Soll Konto ein Aufwandskonto ist, denn diese Buchung ist nicht möglich

    //Jetzt prüfe ob das Habenkonto vorhanden ist und wenn ja buche

    //Wenn es eine Wareneinsatzbuchung ist setze buchungsart auf true
    
}