//Autor Kristjan Liiva
chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.tabs.create({ url: "saved.html"});
});