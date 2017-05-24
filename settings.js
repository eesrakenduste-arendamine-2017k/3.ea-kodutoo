window.onload = function(){
  document.getElementById("addNewPageBTN").addEventListener("click", addPage);
  document.getElementById("removeOldPageBTN").addEventListener("click", delPage);
  document.getElementById("loadSaved").addEventListener("click", displaySaved);
};

function addPage(){
  var pageUrl = document.getElementById("addNewPage").value;
  console.log("salvestatud: " + pageUrl);
  saveLocal(pageUrl);
}

function delPage(){
  var pageUrl = document.getElementById("removeOldPage").value;
  delLocal(pageUrl);
}

function saveLocal(s){

  var pages = [];

  var page ={
    url : s
  };

  var pagesFromStorage = null;

  if(localStorage.getItem("pages")){
    pagesFromStorage = JSON.parse(localStorage.getItem("pages"));
      if(pagesFromStorage){
        pages = pagesFromStorage;
      }
  }
  pages.push(page);
  localStorage.setItem('pages', JSON.stringify(pages));
}

function delLocal(s){
  var pagesFromStorage = JSON.parse(localStorage.getItem('pages'));
  console.log(pagesFromStorage);

    for(var i = 0; i < pagesFromStorage.length; i++){
      if (pagesFromStorage[i].url == s) {
        console.log("Kustutatud: "+ s);
        pagesFromStorage.splice(i,1);
        break;
      }
    }
  localStorage.setItem('pages', JSON.stringify(pagesFromStorage));
}



function displaySaved(){
  clearDiv();
  var pages = JSON.parse(localStorage.getItem("pages"));
  var content = document.getElementsByClassName('savedUrl')[0];
  var number = 1;
  for(i=0; i< pages.length; i++){
     content.innerHTML += "<p>"+number+") "+pages[i].url+"</p>";
     number = number+1;
  }
}

function clearDiv(){
  document.getElementsByClassName("savedUrl")[0].innerHTML = "";
}
