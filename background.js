
      chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "saveImages.js"});

   /*({
     url: youtubeimgsrc[0].src,
     saveAs:   true
   });*/
});
