# 3. kodutöö – Chrome extension

Kodutööna peab looma Chrome extension'i selliselt, et nõuded oleksid täidetud.

**Töö võib teha ka kahekesi, kuid siis peab GitHubis nägema, kes mida tegi!**

## Nõuded

1. Kirjelda README.md failis, mida rakendus teeb
1. Rakendus peab tegema veebilehe/veebirakenduse kas ilusamaks, mugavamaks või huvitamaks
1. Peab oleama piisavalt keerukas (midagi enemat kui tunnis tegmine)
1. Rakendus peab salvestama andmeid serverisse (võib lahendada praegu laisalt ilma autentimiseta, kasuta nt [firebase](https://firebase.google.com/))
1. Ole loominguleine, näiteks põnevad asjad millele saab brauser ligi
    - bluetooth, sh pulsivöö
    - mikrofon [näide](https://www.talater.com/annyang/)
    - webcam [näide](https://revealjs.herokuapp.com/#/0/1)

## Täiendav abimaterjal

* Chrome extension API [JavaScript APIs](https://developer.chrome.com/extensions/api_index/)
* Chrome extension'ite näited [Sample Extensions](https://developer.chrome.com/extensions/samples/)


# Rakendus
* Stackoverflow, code sectionile vajutades kopeerib see selle sisu automaatselt clipboardi ning lisab sinna juurde JS (ainult JS)
kommentaari selle threadi urls ja link autori kasutajale, kes seda andis.

* Rakendus ise aga jälgib pidevalt külastatuid lehekülgi, salvestades iga külastuskäiguga lehekülge, kasutatud protokolli http/https,,
kellaaega/kuupäeva ning kasutades Google Chrome visibility API'd, ka kui kaua keegi mingi lehekülje peal on olnud.

* Rakenduse ikoonile vajutades, näitab see lihtsal kujul välja HTTP/HTTPS esinevus kordi pie chart abil, ning kasutusaja päeval tehtud
veebikülastuste arvu bar chart abil.

Rakendus kasutab Chart.js graafide näitamiseks, mida greenys pole võimalik niisama installida.
