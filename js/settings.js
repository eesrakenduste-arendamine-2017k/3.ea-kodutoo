window.onload = function() {

    document.querySelector('#shortcutLink').addEventListener('click', function() {
        settings.openLink('chrome://extensions/configureCommands');
    });
    document.querySelector('.popupWidth').addEventListener('change', function(e) {
        localStorage['popup.width'] = e.target.value;
    });

    var settings = new Settings();
    settings.displayShortcut();
    settings.setupWidthSlider();
};

function Settings()
{
    setInterval(this.displayShortcut, 1000);
}

Settings.prototype.setupWidthSlider = function()
{
    var selected = localStorage['popup.width'];

    if (typeof localStorage['popup.width'] == 'undefined') {
        document.querySelector('.popupWidth').value = 2;
    } else {
        document.querySelector('.popupWidth').value = selected;
    }
};

Settings.prototype.displayShortcut = function()
{
    chrome.commands.getAll(function(commands){

        var foundShortcut = false;

        for(command in commands) {
          // Shortcut näitab otseteeks valitud klahvide kombinatsiooni Options all
            if(commands[command]['name'] == '_execute_browser_action' && commands[command]['shortcut'] != '') {
                document.querySelector('#Shortcut').innerText = commands[command]['shortcut'];
                foundShortcut = true;
                break;
            }
        }
        // kui ei leia otseteed
        if (!foundShortcut) {
            document.querySelector('#Shortcut').innerText = '[Pole valitud]';
        }

    }.bind(this));
};

// avan otsetee seadistused eraldi aknas
Settings.prototype.openLink = function(link)
{
    chrome.tabs.create({
        url: link
    });
};
