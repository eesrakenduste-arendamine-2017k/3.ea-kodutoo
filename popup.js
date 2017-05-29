var APP = function() {

    if (APP.instance_) {
        return APP.instance_;
    }
    APP.instance_ = this;
    this.init();

};

APP.prototype = {

    // Funktsioon, mille käivitame alguses
    init: function() {
        getDataFromFirebase();
        var htmlValidation = document.getElementById("htmlValidation");
        var cssValidation = document.getElementById("cssValidation");
        var action = document.getElementById("action");
        htmlValidation.addEventListener('click', this.htmlValidation.bind(this));
        cssValidation.addEventListener('click', this.cssValidation.bind(this));
        action.addEventListener('click', this.convertPTSizes.bind(this));

    },
    // HTML valideerimine
    htmlValidation: function(event) {
        if (user) {
            chrome.tabs.getSelected(null, function(tab) {
                writeValidationData(tab.url);
                console.log(tab.url);
                window.open("https://validator.w3.org/check?uri=" + tab.url, '_blank');
            });
        } else {
            getUserName();
            chrome.tabs.getSelected(null, function(tab) {
                writeValidationData(tab.url);
                console.log(tab.url);
                window.open("https://validator.w3.org/check?uri=" + tab.url, '_blank');
            });
        }


    },
    // CSS valideerimine
    cssValidation: function(event) {

        if (user) {
            chrome.tabs.getSelected(null, function(tab) {
                writeValidationData(tab.url + (' - (HTML)'));
                chrome.tabs.getSelected(null, function(tab) {
                    window.open("https://jigsaw.w3.org/css-validator/validator?uri=" + tab.url, '_blank');
                });
            });
        } else {
            getUserName();
            chrome.tabs.getSelected(null, function(tab) {
                writeValidationData(tab.url + (' - (CSS)'));
                chrome.tabs.getSelected(null, function(tab) {
                    window.open("https://jigsaw.w3.org/css-validator/validator?uri=" + tab.url, '_blank');
                });
            });
        }
    },
    // Suuruste konverteerimine
    convertPTSizes: function(event) {
        var ptSize = document.getElementById("fromPT").value;
        var answerArea = document.getElementById("answer");
        var answer;

        if (document.getElementById("toPX").checked) {
            answer = ptSize * (96 / 72) + "px";
        } else if (document.getElementById("toEM").checked) {
            answer = ptSize * (1 / 12) + "em";
        } else if (document.getElementById("toPERCENT").checked) {
            answer = ptSize * (100 / 12) + "%";
        } else {

        }



        answerArea.innerHTML = answer;
    }
};


window.onload = function() {
    var chromeExtension = new APP();
    window.chromeExtension = chromeExtension;

};