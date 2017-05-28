
 //plaan b script css disablemisega, kui JS kasutamine on disabled ja ei saa content.js kasutada(otsi overflow link enne saatmist)
chrome.tabs.onUpdated.addListener(function(tab_id, info) {

    if (info.status == 'complete')
    {
        chrome.storage.sync.get('disable_css', function (items)
        {
            if (items.disable_css === true)
            {
                var code = "var stylesheets = document.styleSheets;for (var i=0; i<stylesheets.length; i++){stylesheets[i].disabled = true;}";

                chrome.tabs.executeScript(tab_id, { 'code': code }); //peaks panema idee poolest ülemise code tööle kogu sessioonis?
            }
        });
    }

});

