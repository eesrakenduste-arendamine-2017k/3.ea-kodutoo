function createCORSRequest(method = "get", url = "http://www.novelupdates.com/rss.php?uid=17670&unq=56ea8c3a00624&type=read"){
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

var request = createCORSRequest("get", "http://www.novelupdates.com/rss.php?uid=17670&unq=56ea8c3a00624&type=read"  );
if ( request ){
// Define a callback function
	request.onload = function(){

		raw.innerHTML = request.responseText;
		
		var x = document.createElement('div');
		x.innerHTML =raw.innerHTML;
		var descriptions = x.getElementsByTagName('description');
		var links = x.getElementsByTagName('link');
		var titles = x.getElementsByTagName('title');
		var pubDate = x.getElementsByTagName('pubDate');

		for (var i=1; i<8; i++){
			document.getElementById('titles').innerHTML += "<b>"+titles[i].textContent+"</b><br>"+  //küsi miks <a href='"'+links[i]......ei töödanud
															""+descriptions[i].textContent+""+"<br>"+
															pubDate[i].textContent+"<br>";
			
		}
	};
request.send();

}
