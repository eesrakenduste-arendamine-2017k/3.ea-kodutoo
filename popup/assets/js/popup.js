/*

//----->>>>> https://stackoverflow.com/questions/14531102/saving-and-retrieving-from-chrome-storage-sync <<<<<------
chrome.storage.sync.set({"myKey": testPrefs});
chrome.storage.sync.remove({"myKey"});

*/

 //proovib lükata välja css, muudab storaget
function disable_css ()
{
    chrome.storage.sync.set({ 'disable_css': true });
}




 //proovib sisse lükata css, updateb "storaget"
function enable_css ()
{
    chrome.storage.sync.remove('disable_css');
}




//kontroll kas sees või väljas css
function update_buttons_css ()
{
    chrome.storage.sync.get('disable_css', function (items)
    {
        var button_css_disable = document.getElementById('button-css-disable');
        var button_css_enable  = document.getElementById('button-css-enable');

        if (items.disable_css === true)
        {
            button_css_disable.className = button_css_disable.className + ' active';
            button_css_enable.className = button_css_enable.className.replace(/active/g, '');
        }
        else
        {
            button_css_enable.className = button_css_enable.className + ' active';
            button_css_disable.className = button_css_disable.className.replace(/active/g, '');
        }
    });
}







//info box vajutusel
function show_info_box ()
{
   
    chrome.storage.sync.get('disable_info', function (items)
    {
        if (items.disable_info !== true)
        {
            var info_box = document.getElementById('info-box');
            var checkbox = document.getElementById('info-box-checkbox');

            //näita boxi
            info_box.className = info_box.className + ' show';

            //lisan eventlistenerid boxi külge
            checkbox.addEventListener('change', function()
            {
                chrome.storage.sync.set({ 'disable_info': (checkbox.checked === true) });

                _gaq.push(['_trackEvent', 'Info-Box', 'hide-checkbox', (checkbox.checked === true) ? 'checked' : 'unchecked']);
            });
        }
    });
}



//info box kinni
function close_info_box ()
{
    var info_box = document.getElementById('info-box');

    info_box.className = info_box.className.replace(/show/g, '');
}



//run kui html laetud(dom)
document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById('button-css-disable').addEventListener('click', function()
    {
        disable_css();
        update_buttons_css();
        show_info_box();

        _gaq.push(['_trackEvent', 'Switch', 'CSS', 'off']);
    });

    document.getElementById('button-css-enable').addEventListener('click', function()
    {
        enable_css();
        update_buttons_css();
        show_info_box();

        _gaq.push(['_trackEvent', 'Switch', 'CSS', 'on']);
    });

    

    document.getElementById('info-box-close').addEventListener('click', function()//info box kinni 
    {
        close_info_box();
    });

    update_buttons_css();

});