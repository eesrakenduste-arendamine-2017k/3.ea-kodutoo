
$(document).ready(function () {
    console.log('ready');
    $.each(chrome.extension.getBackgroundPage().BLOCKER.getBlockedSites(), function (index, value) {
        console.log(index);
        $("#blockedlist").append("<div class='siterow' title='" + value + "'><div class='sitename'>" + index + "</div><span class='sitedesc'>" + value + "</span></div>");
    });
});