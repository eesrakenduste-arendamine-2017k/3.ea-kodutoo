"use strict";
function Master() {
    firebase.initializeApp(config);

    this.weekdays = ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
    this.months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    this.time = 0;

    this.http_usage = this.get_http();
    this.https_usage = this.get_https();
    this.todays_usage = this.get_today_sites();
    let that = this;

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(request.message);
        if (request.message === "hello") {
            sendResponse({farewell: [that.http_usage.length, that.https_usage.length]});
        }
    });

    this.init();
}


Master.prototype = {

    save_to_database: function (id) {
        firebase.database().ref("websites/" + id).set({
            "time": new Date().getTime(),
            "url": window.location.hostname,
            "protocol": window.location.protocol,
            "time_spent": this.time
        });
    },

    handleMessage: function (request, sender, sendResponse) {
        console.log("Message from the content script: " + request.greeting);
    },

    init: function () {
        if (window.location.hostname === "stackoverflow.com") {
            this.copy_code();
        }


        // Juhul kui tab on aktiivne, siis iga sekundi tagant suurendab ajamuutujat.
        let that = this;
        let tiktok = setInterval(function () {
            if (document.hidden === false) {
                that.time++;
            }
        }, 1000);

        // Loob unikaalse id salvestamiseks.
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        // Teeb algse salvestuse.
        this.save_to_database(id);

        // Uuendab kirjet iga kolme sekundi tagant.
        // Trükib välja vastava teate konsooli.
        let db = firebase.database();
        let save_data = setInterval(function () {
            db.ref("/websites/" + id).update({"time_spent": master.time});
            //console.log("Updated data in the database");
        }, 3000);

        // Lehe kinni panemisel, viisakalt võtab välja kõik intervalid. Igaksjuhuks.
        window.onunload = function () {
            clearInterval(tiktok);
            clearInterval(save_data);
        }
    },

    copy_code: function () {
        // execCommand("copy") saab aintult kasutada formivälju kasutades body seest.
        // Luuakse textarea, pannakse sinna sisse tekst, lükatakse body sisse, lisatakse clipboardi ja kustatakse bodyst.
        // Textarea sisu sisse lükatakse veel link kasutajala ja lehekülje url kust kood võeti.
        let code_sections = document.querySelectorAll(".prettyprint");
        for (let i = 0; i < code_sections.length; i++) {
            code_sections[i].addEventListener("dblclick", function () {

                // Võtab kätte kasutajanime liikudes koodi elemendist content div'i ja sealt otsib query selectoriga õige kausta välja.
                let user = code_sections[i].parentElement.parentElement.querySelector("div.user-details a").href;

                let copyFrom = document.createElement("textarea");
                copyFrom.textContent = "// " + user + "\n" + "// " + window.location.href + "\n" + code_sections[i].textContent;
                let body = document.getElementsByTagName('body')[0];
                body.appendChild(copyFrom);

                copyFrom.select();
                document.execCommand('copy');
                body.removeChild(copyFrom);


                console.log("Andmed salvestatud");
                code_sections[i].style.backgroundColor = "black";
                setTimeout(function () {
                    code_sections[i].style.backgroundColor = "#eff0f1";
                }, 600);

            });
        }
    },

    get_today_sites: function () {
        let start = new Date().setHours(0,0,0,0).getTime();
        let end = new Date().setHours(23,59,59,999).getTime();

        let content = [];
        let time = new Date().getTime();

        let ref = firebase.database().ref('websites/');
        ref.orderByChild("time").equalTo(time).once('value', function (data) {
            data.forEach(function (snapshot) {
                content.push(snapshot.val());
            })
        });
        return content;
    },

    get_https: function () {
        let content = [];
        let ref = firebase.database().ref('websites/');
        ref.orderByChild("protocol").equalTo("https:").once('value', function (data) {
            data.forEach(function (snapshot) {
                content.push(snapshot.val());
            })
        });
        return content;
    },

    get_http: function () {
        let content = [];
        let ref = firebase.database().ref('websites/');
        ref.orderByChild("protocol").equalTo("http:").once('value', function (data) {
            data.forEach(function (snapshot) {
                content.push(snapshot.val());
            })
        });
        return content;
    }
};


window.onload = function () {
    let master = new Master();
    window.master = master;
};
