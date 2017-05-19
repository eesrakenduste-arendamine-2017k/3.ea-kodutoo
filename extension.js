//alert('sfsdf');
// import moment form moment.js;

var startDate;
var endDate;
var totalTime;

chrome.storage.local.get('totalTime', function(result){

totalTime = result.totalTime || 0;

});
var playTime;



function checkIfVideoReady() {
    var vid = document.getElementsByTagName("video")[0];
    //console.log(vid);

    if (!vid) {
        window.setTimeout(function() {
            checkIfVideoReady();
        }, 10);
    }

    if (!vid.playing) {
        console.log("ei m2ngi");
        window.setTimeout(function() {
            checkIfVideoReady();
        }, 10);
    }

    startDate = new Date();

    console.log(vid);
    vid.onplaying = function() {
        console.log("The video is now playing");
        startDate = new Date();
        //startDate.getTime();
        console.log("Start time:", startDate.getTime());
    };

    vid.onpause = function() {
        console.log("The video is now paused");
        endDate = new Date();
        //endDate.getTime();
        console.log("End time:", endDate.getTime());
        playTime = (endDate - startDate) / 1000;
        console.log("Playtime:", playTime);
        totalTime = (totalTime + playTime);
        chrome.storage.local.set({'totalTime': totalTime});
        chrome.storage.local.get('totalTime', function(result){
            console.log(result);
        });


        console.log("Total video time watched:", totalTime.toFixed(2));

    };
}
    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
        get: function() {
            return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
        }
    });




window.setTimeout(function() {
    checkIfVideoReady();
}, 10);


// window.onload= function () {
//     firebase.initializeApp(config);
// };
