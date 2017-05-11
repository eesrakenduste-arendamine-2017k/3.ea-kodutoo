var SM = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    }
    my.put = function (key, value) {
        return localStorage.setItem(key, value);
    }
    my.delete = function (key) {
        return localStorage.removeItem(key);
    }
    
    return my;

}());

var BLOCKER = (function (SM) {
    var my = {};

    my.blockChoosenSites = {
      
    }
    
    if (!SM.get("blocklist")) {
        SM.put("blocklist", JSON.stringify(my.blockChoosenSites));
    }
    
    my.getBlockedSites = function () {
        return JSON.parse(SM.get("blocklist"));
    }
    
    my.setInstead = function (value) {
        var prot = /^http|chrome-extension/i;
        if (value.match(prot)) {
            SM.put("instead", value);
        } else {
            SM.put("instead", "http://" + value);
        }
        return SM.get("instead");
    }

    my.getInstead = function () {
        return SM.get("instead");        
    }
    
    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        my.blockedSites[site] = "";
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        delete my.blockedSites[site];
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    }
    
    return my;
}(SM));