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

function timedata(){

        var end = performance.now();
        var totaltime = (end-start)/1000;
        kokku  += totaltime;
        var kokky = kokku+s;
        writeUserData(kokky);
        saveChanges(kokky);
        restartStartTime();     
        
}

//salvestab aja firebase
function writeUserData(kokku) {
  firebase.database().ref("timer/"+user).set({
    Time: kokku
  });
}
