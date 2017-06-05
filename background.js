var s;
var start;
var kokku=0;
var timeOut = 15;
var secondsCounter = 0;
var end;
var totaltime = 0;



window.onload = function (){

    chrome.storage.sync.get("totaltime", function(data) {
      //console.log("data", data);
      totaltime = data.totaltime;
      console.log("Sain kätte: "+totaltime);
      if(totaltime===null){
        totaltime=0;
        console.log("Algväärtustasin aja: ", totaltime);
      }
    });
    startTimer();
  var myVar = setInterval(timedata, 1000);

};

function timedata(){
        end = performance.now();
        //totaltime = parseInt(localStorage.getItem("timerSec"));
        totaltime = totaltime + (end-start)/1000;
        start = performance.now();

        console.log("totaltime: "+ totaltime);
        chrome.storage.sync.set({'totaltime': totaltime}, function() {
           // Notify that we saved.
           console.log("salvestatud "+totaltime);
         });


        if(totaltime > 30){
          kokku  += totaltime;
          console.log("Kokku: "+ kokku);

          alert();
        }


}

function alert(){
  saveUsage();
  console.log("Time's up!");
  totaltime = 0;
  chrome.storage.sync.set({'totaltime': totaltime}, function() {
      chrome.storage.sync.get("totaltime", function(data) {
        console.log("Tagasi nulli: ", data);
      });
    });
  confirm("Puhka silmi 1 minut! Seejärel vajuta OK, et jätkata.");
  startTimer();
}

function startTimer(){
    start = performance.now();
    return start;
}

document.onclick = function() {
    secondsCounter = 0;
};
document.onmousemove = function() {
    secondsCounter = 0;
};
document.onkeypress = function() {
    secondsCounter = 0;
};

window.setInterval(checkTime, 1000);

function checkTime() {
    secondsCounter++;

    if (secondsCounter >= timeOut) {
        totaltime -= timeOut;
        saveUsage();
        kokku  += totaltime;
        console.log("User inactive -> timer reset");
        console.log("Kokku: " +kokku);
        secondsCounter = 0;
        totaltime = 0;
        chrome.storage.sync.set({'totaltime': totaltime}, function() {
            chrome.storage.sync.get("totaltime", function(data) {
              console.log("Tagasi nulli: ", data);
            });
          });
        confirm("Olid mõnda aega eemal, vajuta OK kui oled tagasi.");
        startTimer();
    }
}

function saveUsage(){
  var allUsages = [];

		        var usage = {
			           timeSpent: totaltime,
			           date: new Date()
		                   };
                       var usagesFromStorage = null;

           		if(localStorage.getItem("allUsages")){
           			usagesFromStorage = JSON.parse(localStorage.getItem("allUsages"));

           			if(usagesFromStorage){
           				allUsages = usagesFromStorage;
           			}

           		}

           		allUsages.push(usage);

           		localStorage.setItem("allUsages", JSON.stringify(allUsages));
              console.log("aeg lisatud");
}
