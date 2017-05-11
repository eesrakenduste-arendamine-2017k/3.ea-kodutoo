var _redirect = _redirect || [];

function showBlockList() {
    $("#blocklist").children().remove();
    var i = 1;
    $.each(BLOCKER.getBlockedSites(), function (index, value) {
        $("#blocklist").append("<div id='site-" + i + "'><input type='button' id='unblock-" + i + "' value='Unblock' /> " + index + "  " + value + "</div>");
        $("#unblock-" + i).click(function () {
            BLOCKER.removeBlockedSite(index);
            showBlockList();
        });
        i += 1;
    });
}
function trackButtonUse(id) {
    _redirect.push(['_trackEvent', 'button-' + id, 'clicked']);
}

$(document).ready(function () {
   
    $("#block").click(function () {
        trackButtonUse("block");
        BLOCKER.addBlockedSite($("#prohibited").val());
        var prot = /\/\//g;
        
        showBlockList();
    });
    if (BLOCKER.getInstead() !== chrome.extension.getURL("instead.html")) {
        $("#watchthatinstead").attr('value', BLOCKER.getInstead());
    }
    showBlockList();
});