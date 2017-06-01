# 3. kodutöö – Chrome extension

## Config faili sisu

```JS
var config = {
    apiKey: "AIzaSyDGmQcgKaVbrM8-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXX.firebaseapp.com",
    databaseURL: "XXXXXXXXXfirebaseio.com",
    projectId: "XXXXXXXX-XXX",
    storageBucket: "XXXXXXXXX.appspot.com",
    messagingSenderId: "XXXXXXXXXXXXXX"
  };

  firebase.initializeApp(config);
```

## Kirjeldus

1. Extension laseb kasutajal salvestada uudiste artikleid hilisemaks lugemiseks (vajutades klahvi "y", samal ajal kui lingi peal on kursor).
1. Andmebaasi salvestatakse artiklinimi ja url
1. Ikoon avab lehe, kus on salvestatud lehtede nimekiri, võimalus linke avada ja kirjeid kustutada.