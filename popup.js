
function loadUrls() {

  	// Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
	var urls = document.getElementById('urls').value.split('\n');
	var openedStats = 0;
 
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
			}
      	}
    }
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

/*
** STACK OVERFLOWST SAADUD KOOD, TÄPSET VIIDET EI LEIDNUD UUESTI ÜLES
*/

document.addEventListener('DOMContentLoaded', function () {
  	// Kuular URL'ide avamiseks
  	document.getElementById('openBtn').addEventListener('click', loadUrls);
  	// Kuularid URL'ide salvestamiseks
  	document.getElementById('saveBtn').addEventListener('click', saveUrls);
  	document.getElementById('openBtn').addEventListener('click', saveUrls);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
    	return;
    }

    document.getElementById('urls').value = urls;
});
