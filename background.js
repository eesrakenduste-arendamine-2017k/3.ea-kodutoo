/*
Author: Kristjan Liiva
@ https://github.com/kliiva5/3.ea-kodutoo/blob/master/background.js
2017.05.31
*/
chrome.browserAction.onClicked.addListener(function(activeTab){
    chrome.tabs.create({ url: "saved.html"});
});