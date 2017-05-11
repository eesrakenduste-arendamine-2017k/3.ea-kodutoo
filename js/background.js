
if (!BLOCKER.getInstead()) {
    BLOCKER.setInstead(chrome.extension.getURL("instead.html"));
}
chrome.tabs.onUpdated.addListener(function (tabId, changedInfo, tab) {
    var site;
    for (site in BLOCKER.getBlockedSites()) {
        if (tab.url.match(site)) {
            chrome.tabs.update(tabId, {"url" : BLOCKER.getInstead()}, function () {});
        }
    }
});
chrome.tabs.onCreated.addListener(function (tab) {
    var site;
    for (site in BLOCKER.getBlockedSites()) {
        if (tab.url.match(site)) {
            chrome.tabs.update(tab.id, {"url" : BLOCKER.getInstead()}, function () {});
        }
    }
});