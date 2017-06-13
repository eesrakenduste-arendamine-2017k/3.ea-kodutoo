var timesUsed = 0;
var linksOpened = 0;

function loadUrls() {

  	// Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
	var urls = document.getElementById('urls').value.split('\n');
 
    // Tsükkel kõikide  URL'ide läbikäimiseks
    for (var i = 0; i < urls.length; i++){
      	// Eemaldan URL'ist ebavajalikud asjad
      	// Viide: https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
      	cleanUrl = urls[i].replace(/\s/g, '');
      	// Kui puhastatud URL pole tühi, siis avan selle uues aknas
      	if(cleanUrl != '') {
      		// Kontrollib kas URL'il on ees HTTP, kui ei ole, siis lisab selle
      		// Viide: https://stackoverflow.com/questions/3543187/prepending-http-to-a-url-that-doesnt-already-contain-http
	      	if (!cleanUrl.match(/^[a-zA-Z]+:\/\//)){
			    cleanUrl = 'http://' + cleanUrl;
			    chrome.tabs.create({"url": cleanUrl, "selected": false});
			    linksOpened += 1;
			}
      	}
    }
	timesUsed += 1;
    document.getElementById("timesUsed").innerHTML = timesUsed;
    document.getElementById("linksOpened").innerHTML = linksOpened;
}

function saveUrls() {
    // Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
    var urls = document.getElementById('urls').value.split('\n');
    // Tekitan muutuja kuhu sisse URL'id panen
    var urlsContainer = "";
    // Tsükkel kõikide  URL'ide läbikäimiseks
    for (i = 0; i < urls.length; i++) {
      	// Kui URL ei ole tühi, salvestan Local Storage'sse
      	if(urls[i] != ' ') {
         	urlsContainer += urls[i] + '\n';
         	localStorage['urls'] = urlsContainer;
      	}
    }
}

function loadStats() {
	linksOpened = parseInt(localStorage['linksOpened']);
	if (!linksOpened) {
		linksOpened = 0;
	}

	timesUsed = parseInt(localStorage['timesUsed']);
	if (!timesUsed) {
		timesUsed = 0;
	}
}

function saveStats() {
	localStorage['linksOpened'] = linksOpened;
	localStorage['timesUsed'] = timesUsed;
}

/*
** STACK OVERFLOWST SAADUD KOOD, TÄPSET VIIDET EI LEIDNUD UUESTI ÜLES
*/

document.addEventListener('DOMContentLoaded', function () {
  	// Kuular URL'ide avamiseks
  	document.getElementById('openBtn').addEventListener('click', loadUrls);
  	// Kuularid URL'ide salvestamiseks
  	document.getElementById('saveBtn').addEventListener('click', saveUrls);
  	document.getElementById('openBtn').addEventListener('click', saveUrls);
  	//
  	document.getElementById('openBtn').addEventListener('click', saveStats);
  	document.getElementById('openBtn').addEventListener('click', loadStats);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
    	return;
    }

    loadStats();
    document.getElementById("timesUsed").innerHTML = timesUsed;
    document.getElementById("linksOpened").innerHTML = linksOpened;
    document.getElementById('urls').value = urls;
});
