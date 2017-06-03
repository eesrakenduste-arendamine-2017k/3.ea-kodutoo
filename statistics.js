function get_data(){

    chrome.storage.local.get("content", function(data) {
        if(typeof data.content === "undefined") {

        } else {
            console.log(data.content);
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    console.log("Loaded page");
    firebase.initializeApp(config);
    document.getElementById("showStatistics").addEventListener("click", get_data);
});