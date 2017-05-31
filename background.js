function createCORSRequest(method = "get", url = "https://postimees.ee/rss"){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS

        xhr.open(method, url, true);
				//console.log(xhr);

    } else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var raw = document.createElement('div');
var container = document.getElementById('container');
var print = function(item) {
    var title = document.createElement('div');
    title.innerHTML = document.createTextNode(item.getElementsByTagName('title')[0].value);
    //Loeme descriptioni ka sisse kuigi ei tee esialgu sellega midagi
    var description = item.getElementsByTagName('description')[0].value;
    //misiganes su wrapper div on kuhu kylge kuvatavat appendid - n2ites container
    container.appendChild(title);

}

var request = createCORSRequest("get", "https://postimees.ee/rss"  );
if ( request ){
// Define a callback function
	request.onload = function(){

		raw.innerHTML = request.responseText;
		
		var x = document.createElement('div');
		x.innerHTML =raw.innerHTML;
		var descriptions = x.getElementsByTagName('description');
		var titles = x.getElementsByTagName('title');
		var pubDate = x.getElementsByTagName('pubDate');

		for (var i=2; i<8; i++){
			document.getElementById('titles').innerHTML += "<b>"+titles[i].textContent+"</b><br>"+
															""+descriptions[i].textContent+"<br>";
			
		}
	};
request.send();

}
