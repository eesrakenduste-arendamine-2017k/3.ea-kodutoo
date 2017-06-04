"use strict";
function Master() {
    firebase.initializeApp(config);
    let that = this;
    this.labels = [];
    this.time = 0;

    // Salvestab kõik http(s) protokolliga ja tänasel kuupäeval tehtud kirjed listi. [Object1, Object2, Object...]
    // Firebase salvestab asünkroonselt andmeid, peab arvestama sellega et andmete saatmine ei toimuks enne kui FB'st kohale jõuab.
    this.http_usage = this.get_http();
    this.https_usage = this.get_https();
    this.todays_usage = this.get_today_sites();

    // Kuulab päringut extensio seest ning kui saab siis saadab tagasi andmeid.
    // Saadetavatel andmetel on limiit peal. u 50MB.
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request.message);
        if (request.message === "hello") {
            sendResponse({farewell: [that.http_usage.length, that.https_usage.length, that.labels]});
        }
    });
    this.save_time_inloop();

}


Master.prototype = {

    // Võtab akna seest andmeid ja salvestab andmebaasi sisse.
    // Kutsutakse välja save_time_inloop seest iga kolme sekundi tagant.
    save_to_database: function (id) {
        firebase.database().ref("websites/" + id).set({
            "time": new Date().getTime(),
            "url": window.location.hostname,
            "protocol": window.location.protocol,
            "time_spent": this.time
        });
    },

    // Annab igale lahtitehtud tab'i Visibility API'st kuulaja.
    // Kui kasutajal on tab aktiivne, siis loeb taimer aega ja salvestab selle pidevalt andmebaasi.
    // Kui veebilehitseja aken pannakse kinni, vajutatakse lingile või vahetatakse tab, siis time ei loe.
    // Tab'i tagasitulle hakkab taimer jälle tööle.
    save_time_inloop: function () {
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

        // Loob unikaalse id igale lahtitehtud tab'l salvestamiseks andmebaasi.
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        // Teeb algse salvestuse.
        this.save_to_database(id);

        // Uuendab kirjet iga kolme sekundi tagant.
        let db = firebase.database();
        let save_data = setInterval(function () {
            db.ref("/websites/" + id).update({"time_spent": master.time});
        }, 3000);

        // Lehe kinni panemisel, viisakalt võtab välja kõik intervalid. Igaksjuhuks.
        window.onunload = function () {
            clearInterval(tiktok);
            clearInterval(save_data);
        }
    },

    // Juhul kui lahti tehtud lehekülg on Stackowerflow, siis lisab koodi kopeerimise funktsionaalsuse.
    // Töötab ainult <code> elemendi peale dopeltvajutust tehes salvestades selle sisu clipboardi, code snippetid ei tööta.
    // Lisab salvestatud koodile juurde url threadi leheküljest ja selle esitanud kassutaja profiil.
    copy_code: function () {
        let code_sections = document.querySelectorAll(".prettyprint");
        for (let i = 0; i < code_sections.length; i++) {
            code_sections[i].addEventListener("dblclick", function () {

                // Võtab kätte kasutajanime liikudes koodi elemendist content div'i ja sealt otsib query selectoriga õige kausta välja.
                let user = code_sections[i].parentElement.parentElement.querySelector("div.user-details a").href;

                // Loob textarea elemendi, täidab sinna sisu ja lisab body sisse.
                // Vajalik, kuna execCommand("copy") vajab selectimist, mis on ainult formiväljadel võimalik body seest.
                let copyFrom = document.createElement("textarea");
                copyFrom.textContent = "// " + user + "\n" + "// " + window.location.href + "\n" + code_sections[i].textContent;
                let body = document.getElementsByTagName('body')[0];
                body.appendChild(copyFrom);

                // Valitakse lisatud fomiväli, kopeeritakse selle väärtus clipboardi ja kustutatakse see body seest.
                copyFrom.select();
                document.execCommand('copy');
                body.removeChild(copyFrom);

                // Vilgutab välja koodiala tagasisideks.
                code_sections[i].style.backgroundColor = "black";
                setTimeout(function () {
                    code_sections[i].style.backgroundColor = "#eff0f1";
                }, 600);
                console.log("Andmed salvestatud");

            });
        }
    },

    // Annab kätte kõik tänasel päeval tehtud postitused.
    // Piirkonnad võetakse kätte tänase päeva baasil.
    get_today_sites: function () {
        let content = [];

        let start = new Date();
        start.setHours(0, 0, 0, 0);
        start = start.getTime();

        let end = new Date();
        end.setHours(23, 59, 59, 999);
        end = end.getTime();

        let ref = firebase.database().ref('websites/');
        ref.orderByChild("time").startAt(start).endAt(end).once('value', function (data) {
            data.forEach(function (snapshot) {
                content.push(snapshot.val());
            })
        });

        let site_names = [];
        content.forEach(function (element) {
            if (site_names.indexOf(element.url) === -1) {
                site_names.push(element.url);
            }
        });

        // Set võtab enda sisse massiivi ja jätab enda sisse ainult unikaalsed väärtused.
        // ... muudab Set tagasi massiiviks.
        this.labels = [...new Set(site_names)];
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
