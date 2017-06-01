// Query is simple to find using the jQuery Unique Selector plugin.
// Window.onload is probably not needed, but added for security sake.

function init(){
	var script = document.createElement('script');
	script.onload = function() {
		alert("Script loaded and ready");
	};

	weekdays = ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
	months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]

	// Creates Unique ID for database access.
	var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

	firebase.initializeApp(config);
	firebase.database().ref("websites/" + id).set({
		"url" : window.location.hostname,
		"protocol": window.location.protocol,
		"date": new Date().getTime()
	});
}


window.onload = function() {
	init();
};