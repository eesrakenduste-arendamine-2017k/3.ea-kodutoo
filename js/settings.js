window.onload = function() {

    document.querySelector('#shortcutLink').addEventListener('click', function() {
        settings.openLink('chrome://extensions/configureCommands');
    });

    var settings = new Settings();
    settings.displayShortcut();
};

function Settings()
{
    setInterval(this.displayShortcut, 1000);
}

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
