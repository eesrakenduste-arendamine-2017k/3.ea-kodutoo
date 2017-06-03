
function get_data(){
    let data = [];
    // https://stackoverflow.com/users/3800583/kenticny
    // https://stackoverflow.com/questions/26296181/simple-message-passing-between-background-js-to-contentscript-js
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "hello"}, function(response) {
            data = response.farewell;
        });
    });
    console.log(data);

    let ctx = document.getElementById("stat1").getContext("2d");
    new Chart(ctx,{
        type: 'pie',
        data: data,
        options: options
    });


}


document.addEventListener('DOMContentLoaded', function () {
    console.log("Loaded page");
    document.getElementById("showStatistics").addEventListener("click", get_data);
});