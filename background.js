"use strict"
function TimeManagement() {
	this.weekdays = ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"];
	this.months = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	this.time = 0;
	this.init();

}


TimeManagement.prototype = {

	save_to_database: function(id) {

		firebase.initializeApp(config);
		firebase.database().ref("websites/" + id).set({
			"url"       : window.location.hostname,
			"protocol"  : window.location.protocol,
			"time_spent": this.time
		});

	},

	init: function() {

		// Juhul kui tab on aktiivne, siis iga sekundi tagant suurendab ajamuutujat.
		var that = this;
		var tiktok = setInterval(function() {
			if(document.hidden == false){
				that.time++;
				console.log(that.time);
			}
		}, 1000);

		// Loob unikaalse id salvestamiseks.
		var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});

		// Teeb algse salvestuse.
		this.save_to_database(id);
		console.log("Made initial save.");

		// Uuendab kirjet iga kolme sekundi tagant.
		var db = firebase.database();
		var save_data = setInterval(function() {db.ref("/websites/" + id).update({ "time_spent": master.time});}, 3000);
		console.log("Updated data in the database");

		// Lehe kinni panemisel, viisakalt võtab välja kõik intervalid. Igaksjuhuks.
		window.onunload = function() {
			clearInterval(tiktok);
			clearInterval(save_data);
			console.log("Cleared intervals");
		}
	}
};


window.onload = function() {
	var master = new TimeManagement();
	window.master = master;
};