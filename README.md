# 3. kodutöö – Chrome extension

Kodutööna peab looma Chrome extension'i selliselt, et nõuded oleksid täidetud.

Kirjeldus: Extension kontrollib, kas veebileht sisaldab sobimatuid märksõnu/teemasid. Kui sisaldab, siis annab extension kasutajale teada, et see veebileht sisaldab midagi sobimatud. Peale seda on kasutajal võimalik otsustada, kas ta ikka soovib seda lehte külastada. Lisaks kontrollitakse ka URL-i ja on võimalik ka öelda, et teatud lehtedel ei kontrollitaks sisu.


var config = {
  apiKey: "AIzaSyDJn4Lpzww_XXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXX.firebaseapp.com",
  databaseURL: "https://XXXXXX.firebaseio.com",
  projectId: "my-extension-404f6",
  storageBucket: "XXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX"
};
