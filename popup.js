
function loadUrls() {

  	// Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
	var urls = document.getElementById('urls').value.split('\n');
 
    // Tsükkel kõikide  URL'ide läbikäimiseks
    for (var i = 0; i < urls.length; i++){

      	// Eemaldan URL'ist ebavajalikud asjad
      	cleanUrl = urls[i].replace(/\s/g, '');
      	/* EI TÖÖTA MINGIL PÕHJUSEL
      	cleanUrl = urls[i].replace('chrome-extension://pbnnfhhaamfedplemichjjnghbclgohl/', '');
      	*/

      	// Kui puhastatud URL pole tühi, siis avan selle uues aknas
      	if(cleanUrl != '') {
        	chrome.tabs.create({"url": cleanUrl, "selected": false}); 
      	}
     
      	// Kui kasutaja ei sisesta URL'i
      	else {
         	document.getElementById('urls').innerHTML = "No value specified";
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
  	// Kuular URL'ide salvestamiseks
  	document.getElementById('saveBtn').addEventListener('click', saveUrls);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
    	return;
    }

    document.getElementById('urls').value = urls;
});
