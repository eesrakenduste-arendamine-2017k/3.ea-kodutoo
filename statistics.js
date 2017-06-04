
function make_piechart(content){
    let ctx = document.getElementById("stat1").getContext("2d");
    let data = {
        labels: ["HTTP ", "HTTPS"],
        datasets: [
            {
                fill: true,
                backgroundColor: [
                    '#ff6966',
                    '#3f9eff'],
                data: [content[0], content[1]],
            }
        ]
    };
    let options = {
        title: {
            display: true,
            text: 'Protocol usage: HTTP vs HTTPS.',
            position: 'top'
        },
        rotation: -0.7 * Math.PI,
        animation: {
            animateScale: true
        }
    };

    new Chart(ctx,{
        type: 'pie',
        data: data,
        options: options
    });
}

function get_data(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "hello"}, function(response) {
            make_piechart(response.farewell);
            console.log(response.farewell);
        });
    });


}


document.addEventListener('DOMContentLoaded', function () {
    console.log("Loaded page");
    document.getElementById("showStatistics").addEventListener("click", get_data);
});