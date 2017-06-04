function make_piechart(content) {
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

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

function make_barchart(content) {
    "use strict";
    let ctx = document.getElementById("stat2").getContext("2d");

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: content[2][1],
            datasets: [{
                    label: "Visited",
                    data: content[2][2],
                    fillColor: generate_colors(content[2][1].length),
                    backgroundColor: generate_colors(content[2][1].length),
                    strokeColor: generate_colors(content[2][1].length),

                }]},
        options: {
            legend: {display: false},
            label: "Most visited sites",
        }
    })
}

function get_data() {
    // Saadab sõnumi background scriptile, et ega tal andmeid pole käes.
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "hello"}, function (response) {
            make_piechart(response.farewell);
            make_barchart(response.farewell);
            console.log(response.farewell);
        });
    });
}

// Funktsioon värvide loomiseks igale bar'i.
function generate_colors(amount) {
    let colors = [];
    for(let i = 0; i<amount; i++){
        colors.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
    }
    return colors;
}

document.addEventListener('DOMContentLoaded', function () {
    get_data();
});