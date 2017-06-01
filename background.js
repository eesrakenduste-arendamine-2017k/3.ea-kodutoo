(function() {	

		if (!localStorage.iTime){
		   	localStorage.iTime = 0+Date.now();
			chrome.storage.sync.set({"iDate":localStorage.iTime});
		}
	    var t = localStorage.iTime;

		if (!localStorage.ads_blocked){
			localStorage.total_ads = 1;
			chrome.storage.sync.set({"u":u,"ads_blocked": 0,"total_ads": 0});
		}

		   chrome.windows.getAll({populate:true},function(windows){
 windows.forEach(function(window){
		window.tabs.forEach(function(tab){
			var a = new URL(tab.url)
			if (a.hostname.search("facebook.com")>0){
							chrome.tabs.reload(tab.id);
			}
	 };
	});

