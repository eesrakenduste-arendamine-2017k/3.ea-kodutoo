firebase.initializeApp(config);
var s;
var start;
var kokku=0;

if(window.location.host== 'www.youtube.com'){
    restartStartTime();  
    readYtimer();
    console.log("Youtube Timer Start");
    var myVar = setInterval(timedata, 1000);
}

function timedata(){

        //console.log("baasis: "+s);
        var end = performance.now();
        var totaltime = (end-start)/1000;
        //console.log("totaltime: "+ totaltime);
        kokku  += totaltime;
        var kokky = kokku+s;
        //console.log("kokku: "+ kokky);
        writeUserData(kokky);

        restartStartTime();       
}

function writeUserData(kokku) {
  firebase.database().ref("timer").set({
    Time: kokku
  });
}

function restartStartTime(){
    start = performance.now();
    return start;
}

function readYtimer(){
    var a = firebase.database().ref("timer");
    a.once('value').then(function(snapshot) {
    s = snapshot.val().Time;
    //console.log("väärtus: "+s);
    return s;
    });
    
}