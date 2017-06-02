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