var a;
function getTime() {

    chrome.storage.sync.get('value', function (obj) {
        //secondstotime(obj.value);
        a=obj.value;
        secondstotime(a);
        document.getElementById('time').innerHTML = a;
        //alert(obj.value);
    });
}

function secondstotime(sec){
        var hours   = Math.floor(sec/ 3600);
        var minutes = Math.floor((sec - (hours * 3600)) / 60);
        var seconds = sec - (hours * 3600) - (minutes * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        a = hours+':'+minutes+':'+seconds.toFixed(0);
        return a;
}

document.addEventListener('DOMContentLoaded', function() {
  getTime();
});
