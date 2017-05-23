// Query is simple to find using the jQuery Unique Selector plugin.
// Window.onload is probably not needed, but added for security sake.


window.onload = function() {
	// Set the query to "fish-out" the position of the target elements.
	var image_query = "img.badge-item-img";
	var title_query = "h2.badge-item-title";

	// Gets the values necessary.
	var title = document.querySelector(title_query).innerHTML;
	var image_source = document.querySelector(image_query).src;

	console.log(title);
	console.log(image_source);

	//<a> download attribute triggers an immediate download by clicking the link/image in question.
	// This simulates that behaviour.
	// Timeout is to close the tab, delay because without it, the download wont have time to initiate.
	var a = document.createElement('a');
	a.href = image_source;
	a.download = '';
	a.click();
	setTimeout(function() { window.open(window.location, '_self').close(); }, 5000);

};