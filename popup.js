document.addEventListener('DOMContentLoaded', function() {

    var openSettings = document.getElementById('openSettings');

    openSettings.addEventListener('click', function(){
      window.open("settings.html");
    });

    openPages.addEventListener('click', function(){
      var pages = JSON.parse(localStorage.getItem("pages"));
      for (var i = 0; i < pages.length; i++) {
        //window.open(pages[i].url);
        chrome.tabs.create({active: true, url: pages[i].url});
      }
    });

});
