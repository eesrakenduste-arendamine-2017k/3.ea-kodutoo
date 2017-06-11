firebase.initializeApp(config);
var s;
var start;
var kokku=0;

//Programm läheb tööle siis, kui oled facekoob lehel
if(window.location.host== 'www.facebook.com'){
    askuser();
    restartStartTime();  
    readYtimer();
	timereminder();
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

//aja millal läks lehele
function restartStartTime(){
    start = performance.now();
    return start;
}

//kas kasutaja on või mitte
function readYtimer(){
    var a = firebase.database().ref("timer");
    a.child(user).once('value', function(snapshot) {
        if(snapshot.exists()){
            s = snapshot.val().Time;
        }else{
            s = 0;
        }
    return s;
    }); 
}

//küsib nimi
function askuser() {
    user = prompt("Whats your name?", "");
}

function saveChanges(savetime) {

        var theValue = savetime;
        if (!theValue) {
          console.log("Sorry, can not save!");
          return;
        }
        chrome.storage.sync.set({'value': theValue}, function() {
        });
      }

//NÄITAB IGA 30SEK POP UP	  
function timereminder() {
    setInterval(function(){ alert("You waste 30sec of your life! Go and do something important !"); }, 30000);
}