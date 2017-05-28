/*
HILJEM INDEX ?
'<div class="className">\
        control_html\
    </div>';
*/

var control_html =
{

  //paneb kinni kõik css mis lehel on.
    disable_css : function ()
    {
        var stylesheets = document.styleSheets;

        for (var i=0; i<stylesheets.length; i++)
        {
            stylesheets[i].disabled = true;
        }

        return true;
    }
};

document.addEventListener('DOMContentLoaded', function()
{
    chrome.storage.sync.get('disable_css', function (items)
    {
        if (items.disable_css === true)
        {
            control_html.disable_css();
        }
    });

});