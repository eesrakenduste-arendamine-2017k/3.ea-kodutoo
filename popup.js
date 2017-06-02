function saveLinks() {
	var linksContainer = "";
	// Et kõiki linke korraga ei võtaks, splitin iga reavahetuse või tühikuga
	//https://stackoverflow.com/questions/25218677/javascript-split-function-to-split-into-array-at-new-line-or-white-space
    var links = document.getElementById('links').value.split(/\s+/);
    for (i=0; i<links.length; i++) {
		//salvestamine
		if(links[i] !== ' ') {
			//lisab salvestatud listile reavahetuse
			linksContainer += links[i] + '\n';
			localStorage.links = linksContainer;
		} else {
			localStorage.links = linksContainer;
		}
    }
}

function clearLinks(){
	//kustutab kõigepealt tühjaks ja siis salvestab tühjana
	var links = document.getElementById('links').value = "";
	saveLinks();	
}

function loadLinks() {
	var links = document.getElementById('links').value.split(/\s+/);
    for(var i=0; i<links.length; i++){

		// nö puhastab urlid - võtab ära ebavajalikud vahed
		//https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
		onlyUrl = links[i].replace(/\s/g, '');

		// avab lehe ja kui väli on tühi, siis annab teate
		if(onlyUrl !== '') {
			chrome.tabs.create({"url": "https://"+onlyUrl, "selected": false}); 
		} else {
         document.getElementById('links').innerHTML = "You haven't inserted any url's yet... :( ";
		}
    }
}


//lehelaadimisel
document.addEventListener('DOMContentLoaded', function() {
	//kuularid
	document.getElementById('button1').addEventListener('click', loadLinks);
	document.getElementById('button2').addEventListener('click', saveLinks);
	document.getElementById('button3').addEventListener('click', clearLinks);
	document.getElementById('button4').addEventListener('click', function(){
		//uue tabi avamine - https://stackoverflow.com/questions/8457382/opening-a-new-tab-on-google-chrome-extension
		chrome.tabs.create({ url: 'help.html' });
    });
	
	//extensioni tausta värvi muutmine
	document.getElementById("color").addEventListener("change", colorPicker);
	function colorPicker() {
		document.body.style.backgroundColor = this.value;
		localStorage.backgroundColor = this.value;
	}
	
	//extensioni fondi muutmine
	document.getElementById("font").addEventListener("change", fontPicker);
	function fontPicker() {
		document.body.style.fontFamily = this.value;
		localStorage.fontFamily = this.value;
	}
	
	var links = localStorage.links;
	var backgroundColor = localStorage.backgroundColor;
	var fontFamily = localStorage.fontFamily;
	if (!links) {return;} else {
		document.getElementById('links').value = links;
	}
	if (!backgroundColor) {return;} {
		document.body.style.backgroundColor = backgroundColor;
	}
	if (!fontFamily) {return;} {
		document.body.style.fontFamily = fontFamily;
	}
	
});