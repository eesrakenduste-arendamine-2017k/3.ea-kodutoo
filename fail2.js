(function () {
var HIDE_CSS = "display: none !important; visibility: hidden !important";
var HIDO_CSS = "outline-offset: 2px; outline: .2em dotted red !important";

function getStorage() {
	chrome.storage.sync.get({
	    isEnabled: true,
		blockSponsored: true,
		blockAds: true,
		blockPUMK: true,
		blockRG: true,		
		highlightAds: false
	}, function(items) {
		addsponsoredItemsRule("ha2837492i", items);
	});
}

var addsponsoredItemsRule = function(id, _v) {
    var style = document.getElementById(id);
    if (!style) {
        style = document.createElement("style");
        style.setAttribute("type", "text/css");
        style.setAttribute("id", id);
        var head = document.querySelector("head") || document.head || document.documentElement;
        if (head) head.appendChild(style);
    }

	    var _rule = '.ha2837492ta, .ha2837492tn, .ha2837492tp, .ha2837492ta, #pagelet_canvas_nav_content, #pagelet_ego_pane_w, #pagelet_side_ads, .-cx-PRIVATE-snowliftAds__root, .ego_column';
		 _rule+='{' + (_v["highlightAds"] ? HIDO_CSS : HIDE_CSS) + '}';
		style.textContent = _rule;

};

return {
    initialize: function () {  

		getStorage();
	}
}

})().initialize()
