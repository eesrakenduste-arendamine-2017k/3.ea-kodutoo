window.addEventListener('DOMContentLoaded', function() {
 
    var link = document.getElementById('btnOpenNewTab');
    
    link.addEventListener('click', function() {
        var newURL = "http://google.com";
        chrome.tabs.create({ url: newURL });
    });
});
