function loadUrls() {

  // textareast urlide leidmine
  var urls = document.getElementById('urls').value.split('\n');

    for(var i=0; i<urls.length; i++){
      // cleanimput
      cleanUrl = urls[i].replace(/\s/g, '');
      // sobivad urlid
      if(cleanUrl !== '') {
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

document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('button').addEventListener('click', loadUrls);

  document.getElementById('button').addEventListener('click', saveUrls);

    // lae urlid browseris
    var urls = localStorage.urls;
    if (!urls) {
      return;
    }
    document.getElementById('urls').value = urls;
});
