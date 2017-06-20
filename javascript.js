// Create localStorage item amountOfLinksToShow and set it to 1 if it doesn't exist yet
if(localStorage.getItem("amountOfLinksToShow") == null){
	localStorage.setItem("amountOfLinksToShow", 1);
}
window.onload = function(){
	// Create input fields, when page is loaded
	for (var i = 2; i <= localStorage.getItem("amountOfLinksToShow"); i++) {
		var hiddenInput = document.createElement("input");
	    hiddenInput.setAttribute("id", "textfield" + i);
	    document.getElementById('textfieldsArea').appendChild(hiddenInput);
	}
	// Put values into input fields, when page is loaded
	for(var i = 1; i <= localStorage.getItem("amountOfLinksToShow"); i++) {
		if(localStorage.getItem("link" + i) != null){
			document.getElementById("textfield" + i).value = localStorage.getItem("link" + i);
		}
	}
};
function saveLinksFun() {
	// Save values in input fields
	for (var i = 1; i <= localStorage.getItem("amountOfLinksToShow"); i++) {
		localStorage.setItem("link" + i, document.getElementById("textfield" + i).value);
		console.log("savelink");
	}
};
// Watch when saveLinkBtn is clicked then run function saveLinksFun
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('saveLinksBtn').addEventListener('click', saveLinksFun);
});
function openLinksFun() {
	// Save values in input fields
	saveLinksFun();
	// Open all the links stored in localstorage under (link + i)
	for (var i = 1; i <= localStorage.getItem("amountOfLinksToShow"); i++) {
		if(localStorage.getItem("link" + i) != ""){
			chrome.tabs.create({"url": localStorage.getItem("link" + i), "selected": false});
		}
	}
}
// Watch when openLinksBtn is clicked then run function openLinksFun
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('openLinksBtn').addEventListener('click', openLinksFun);
});
function addLinkFun(){
	// increment amountOfLinksToShow by one
    localStorage.setItem("amountOfLinksToShow", parseInt(localStorage.getItem("amountOfLinksToShow")) + 1);
    // Add 1 new input field
	var hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("id", "textfield" + localStorage.getItem("amountOfLinksToShow"));
    document.getElementById('textfieldsArea').appendChild(hiddenInput);
    // Put values into input fields
	for(var i = 1; i <= localStorage.getItem("amountOfLinksToShow"); i++) {
		if(localStorage.getItem("link" + i) != null){
			document.getElementById("textfield" + i).value = localStorage.getItem("link" + i);
		}
	}
}
// Watch when addLinkBtn is clicked then run function addLinkFun
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('addLinkBtn').addEventListener('click', addLinkFun);
});
function removeLinkFun(){
	//If amountOfLinksToShow is 2 or bigger
	if(localStorage.getItem("amountOfLinksToShow") > 1){
		// remove 1 input field
		document.getElementById("textfield" + localStorage.getItem("amountOfLinksToShow")).remove();
		// degrease amountOfLinksToShow by one
	    localStorage.setItem("amountOfLinksToShow", parseInt(localStorage.getItem("amountOfLinksToShow")) - 1);
	}
}
// Watch when removeLinkBtn is clicked then run function removeLinkFun
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('removeLinkBtn').addEventListener('click', removeLinkFun);
});