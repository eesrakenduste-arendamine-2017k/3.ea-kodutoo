
function loadUrls() {

  // Võtan HTML'ist URL'id ja splitin nad reavahetuse koha pealt
  var urls = document.getElementById('urls').value.split('\n');
 
    // Tsükkel kõikide  URL'ide läbikäimiseks
    for (var i=0; i < urls.length; i++){

      // Eemaldan URL'ist ebavajalikud asjad
      cleanUrl = urls[i].replace(/\s/g, '');
      cleanUrl = urls[i].replace('chrome-extension://pbnnfhhaamfedplemichjjnghbclgohl/', '');

      // Kui puhastatud URL pole tühi, siis avan selle uues aknas
      if(cleanUrl != '') {
        chrome.tabs.create({"url": cleanUrl, "selected": false}); 
      }
     
      // Kui kasutaja ei sisesta URL'i
      else {
         document.getElementById('urls').innerHTML = "No value specified";
      }
    }
}

function saveUrls() {
    
    // Fetch urls from textarea and split it
    var urls = document.getElementById('urls').value.split('\n');
    
    var urlsContainer = "";
    
    // run a loop on the fetched urls
    for (i=0; i<urls.length; i++) {


      // if the user input valid urls, save it in local chrome storage
      if(urls[i] != ' ') {
         
         urlsContainer += urls[i] + '\n';
         localStorage['urls'] = urlsContainer;

      }
    }
 }
  

document.addEventListener('DOMContentLoaded', function () {


  
  // add an event listener to load url when button is clicked
  document.getElementById('button').addEventListener('click', loadUrls);
  
  // add an event listener to save url when button is clicked
  document.getElementById('button').addEventListener('click', saveUrls);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
      return;
    }
    document.getElementById('urls').value = urls;


});
