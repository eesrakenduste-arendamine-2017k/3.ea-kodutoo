firebase.initializeApp(config);
var s;
var start;
var kokku=0;

//Programm läheb tööle, ki lähed youtube lehele
if(window.location.host== 'www.youtube.com'){
    askuser();
    restartStartTime();  
    readYtimer();
    console.log("Youtube Timer Start");
    //Iga sekundi tagant täidab timedata funktsiooni
    var myVar = setInterval(timedata, 1000);
}


function timedata(){

        //console.log("baasis: "+s);
        //võtab hetke aja
        var end = performance.now();
        //arvutab aja mis on hetkel youtubes veedetud programmis startist
        var totaltime = (end-start)/1000;
        //console.log("totaltime: "+ totaltime);
        kokku  += totaltime;
        //lisab hetkel kokku olnud ajale juulde ka selle mis andmebaasis on ja selle andmebaasi
        var kokky = kokku+s;
        //console.log("kokku: "+ kokky);
        writeUserData(kokky);
        //salvestab aja ka arvuti localstoragesse, et seda saaks poppupile vajadusel aega kuvada
        saveChanges(kokky);
        restartStartTime();     
        
}

//salvestab aja firebase
function writeUserData(kokku) {
  firebase.database().ref("timer/"+user).set({
    Time: kokku
  });
}

//saab aja millal läks lehele
function restartStartTime(){
    start = performance.now();
    return start;
}

//loeb firebasest kas kasutaja on olemas ja kui on siis võtab tema youtubes veedetud aja 
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

//küsib kasutajanime
function askuser() {
    user = prompt("Mis on teie kasutajanimi?", "");
}

function saveChanges(savetime) {

        var theValue = savetime;
        // Check that there's some code there.
        if (!theValue) {
          console.log("EI õnnestunud salvestada");
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          //console.log("salvestatud "+savetime);
        });
      }

