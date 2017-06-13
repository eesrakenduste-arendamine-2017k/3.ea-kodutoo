// Muutujad
var timesUsed = 0;
var linksOpened = 0;

function loadUrls() {
  	// Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
	var urls = document.getElementById('urls').value.split('\n');
    // Tsükkel kõikide URL'ide läbikäimiseks
    for (var i = 0; i < urls.length; i++){
      	// Kustutan URL'ist whitespace'd
      	// Viide: https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
      	cleanUrl = urls[i].replace(/\s/g, '');
      	// Kui puhastatud URL pole tühi
      	if(cleanUrl != '') {
      		// Kontrollib kas URL'il on ees HTTP, kui ei ole, siis lisab selle
      		// Viide: https://stackoverflow.com/questions/3543187/prepending-http-to-a-url-that-doesnt-already-contain-http
	      	if (!cleanUrl.match(/^[a-zA-Z]+:\/\//)) {
			    cleanUrl = 'http://' + cleanUrl;
			    // Avan URL'i uues aknas
			    chrome.tabs.create({"url": cleanUrl, "selected": false});
			    // Iga avatud URL'i kohta suurendan loendurit 1 võrra
			    linksOpened += 1;
			}
      	}
    }
	// Kui lehed on avatud, suurendan loendurit ja uuendan HTML'i
	timesUsed += 1;
    document.getElementById("timesUsed").innerHTML = timesUsed;
    document.getElementById("linksOpened").innerHTML = linksOpened;
}

function saveUrls() {
    // Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
    var urls = document.getElementById('urls').value.split('\n');
    // Tekitan muutuja kuhu sisse URL'id panen
    var urlsContainer = "";
    // Tsükkel kõikide URL'ide läbikäimiseks
    for (i = 0; i < urls.length; i++) {
      	// Kui URL ei ole tühi, salvestan Local Storage'sse
      	if(urls[i] != '') {
         	urlsContainer += urls[i] + '\n';
         	localStorage['urls'] = urlsContainer;
      	}
    }
}

function loadStats() {
	// Võtab Local Storage'st statistika ja muudab selle Int'iks, et saaks inkrementeerida
	linksOpened = parseInt(localStorage['linksOpened']);
	// Kui andmeid pole, siis on 0
	if (!linksOpened) {
		linksOpened = 0;
	}
	// Võtab Local Storage'st statistika ja muudab selle Int'iks, et saaks inkrementeerida
	timesUsed = parseInt(localStorage['timesUsed']);
	// Kui andmeid pole, siis on 0
	if (!timesUsed) {
		timesUsed = 0;
	}
}

function saveStats() {
	localStorage['linksOpened'] = linksOpened;
	localStorage['timesUsed'] = timesUsed;
}

document.addEventListener('DOMContentLoaded', function () {
  	// Kuular URL'ide avamiseks
  	document.getElementById('openBtn').addEventListener('click', loadUrls);
  	// Kuularid URL'ide kättesaamiseks ja salvestamiseks
  	document.getElementById('saveBtn').addEventListener('click', saveUrls);
  	document.getElementById('openBtn').addEventListener('click', saveUrls);
  	// Kuularid statistika ättesaamiseks ja salvestamiseks
  	document.getElementById('openBtn').addEventListener('click', saveStats);
  	document.getElementById('openBtn').addEventListener('click', loadStats);
    

    // Reload the URLs in the browser
    // Stack Overflow'st saadud kood, täpne viide kadunud
    var urls = localStorage['urls'];
    if (!urls) {
    	return;
    }

    // Saan popup laadimisel vajalikud andmed ja kuvan need
    loadStats();
    document.getElementById("timesUsed").innerHTML = timesUsed;
    document.getElementById("linksOpened").innerHTML = linksOpened;
    document.getElementById('urls').value = urls;
});
