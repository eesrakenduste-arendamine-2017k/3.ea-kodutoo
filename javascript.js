window.onload = function(){
	for(var i = 1; i<16; i++){
		if(localStorage.getItem("link" + i) != null){
			document.getElementById("textfield" + i).value = localStorage.getItem("link" + i);
		}
	}
};
function saveLinksFun() {
	for (var i = 1; i < 16; i++) {
		localStorage.setItem("link" + i, document.getElementById("textfield" + i).value);
	}
}
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('saveLinksBtn').addEventListener('click', saveLinksFun);
});
function openLinksFun() {
	saveLinksFun();
	for (var i = 1; i < 16; i++) {
		if(localStorage.getItem("link" + i) != ""){
			chrome.tabs.create({"url": localStorage.getItem("link" + i), "selected": false});
		}
	}
}
document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('openLinksBtn').addEventListener('click', openLinksFun);
});