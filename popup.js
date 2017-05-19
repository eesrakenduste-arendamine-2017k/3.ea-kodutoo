window.onload = function () {
    var totalTime = chrome.storage.local.get.totalTime;
    chrome.storage.local.get('totalTime', function(result){
        console.log(result);

        document.getElementById("result").innerHTML = "You have watched "+secondsToTime(result.totalTime.toFixed(2))+" of videos.";
    });
};

function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds';
}
