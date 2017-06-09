function loadUrls() {

  // textareast urlide leidmine
  var urls = document.getElementById('urls').value.split('\n');


    for(var i=0; i<urls.length; i++){
      // cleaninput

      cleanUrl = urls[i].replace(/\s/g, '');
      // sobivad urlid

      if(cleanUrl !== '') {

        var https = 'https://';
        var http = 'http://';
        if (cleanUrl.substr(0, http.length) == http) {
          cleanUrl = cleanUrl;
        }else if (cleanUrl.substr(0, https.length) !== https) {
          cleanUrl = https + cleanUrl;
        }

         chrome.tabs.create({"url": cleanUrl, "selected": false});
      }

      // kui urlid puuduvad
      else {
         document.getElementById('urls').innerHTML = "No value specified";
      }
    }
}
// Save url chrome storagesse
function saveUrls() {

    // urlide leidmine
    var urls = document.getElementById('urls').value.split('\n');

    var urlsContainer = "";

    for (i=0; i<urls.length; i++) {
      // save sobivad urlid local storagesse
      if(urls[i] != ' ') {

         urlsContainer += urls[i] + '\n';
         localStorage.urls = urlsContainer;
      }
    }
 }

 function clearUrls() {
   var urls = document.getElementById('urls').value.split('\n');
   localStorage.urls = "";
   window.close();
 }

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('loadButton').addEventListener('click', loadUrls);

  document.getElementById('saveButton').addEventListener('click', saveUrls);

  document.getElementById('clearButton').addEventListener('click', clearUrls);

    // lae urlid browseris

    var urls = localStorage.urls;


    if (!urls) {
      return;
    }


    document.getElementById('urls').value = urls;
});
