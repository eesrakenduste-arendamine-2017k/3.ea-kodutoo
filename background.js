firebase.initializeApp(config);
var s;
var start;
var kokku=0;

//Programm läheb tööle siis, kui oled facekoob lehel
if(window.location.host== 'www.facebook.com'){
    askuser();
    restartStartTime();  
    readYtimer();
    console.log("Facebook Timer Start");
    var myVar = setInterval(timedata, 1000);
}


