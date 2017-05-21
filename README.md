# 3. kodutöö – Chrome extension

Extension on kasulik neile, keda huvitab selline sport nagu snooker.

## Kirjeldus

Võtsin aluseks sellise lehekülje nagu http://www.worldsnooker.com/, kus kuvatakse reaalajas toimuvate mängude tulemusi. Lehel kuvatakse aga kogu mängu vaid numbrites, ma lisasin omalt poolt väikese graafilise liidese, kus näidatakse hetkel laual olevate pallide arvu. Ehk teisisõnu näidatakse mis pallid on veel lauas, mille sisselöömisel saavad mängijad punkte.
Kuna igat mängu ei kanta üle televisioonis, võimaldab see natukene mugavamat mängu jälgimist.
Lisaks sellele, salvestab rakendus iga 10 sekundi tagant mänguandmeid andmebaasi, mis võimaldab hiljem mängu analüüsida.

## Rakenduse funktsionaalsused

* Näitab laual olevate snuukripallide arvu ja tüüpi graafiliselt ja tekstiliselt, ehk näiteks 10 punast, 1 kollane, 1 roheline, 1 pruun, 1 sinine, 1 roosa ja 1 must. Või näiteks 1 sinine, 1 roosa, 1 must
* Graafilist liidest on võimalik lehe ülemisse serva ära peita, et see ei segaks linkidele vajutamist (roheline nupp "hide"), või sealt tagasi tuua nupuga "show"
* Rakendus rõhutab graafiliselt kumma mängija käes on mängimiskord muutes selle mängija tausta kollaseks (mängu mängitakse kordamööda)
* Rakendus salvestab jooksvalt iga 10 sekundi tagant mängu info andmebaasi nagu turniirinimi, raund, mitu freimi (ühe laua puhtaksmängimist) mängitakse, palju punkte laual on, mängijad ja nende punktiseisud

## Lisa

Kuna ei saa tagada, et extensioni kontrollimisel ühtegi live mängu käimas on, downloadisin ühe näidislehe, mis asub greeny-s:
* http://localhost:5555/~karlbork/eesrakenduste_arendamine/snooker/Q%20School%202017%20-%20Event%201%20Live%20Match%20_%20World%20Snooker%20Live%20Scores.htm
* http://greeny.cs.tlu.ee/~karlbork/eesrakenduste_arendamine/snooker/Q%20School%202017%20-%20Event%201%20Live%20Match%20_%20World%20Snooker%20Live%20Scores.htm

Lisan kindluse mõttes ka valemi kirjelduse kuidas laual olevaid palle arvutatakse:
* Iga laud alustab maksimaalselt 147 punktiga (15 punast ja 6 värvilist palli)
* Iga kord kui lüüakse sisse punane, kaob laualt 8 punkti (147 - 8 = 139; 139 - 8 = 131 jne)
* Kui kõik punased on sisse löödud, on laual 27 punkti
* Edasi lüüakse värvilisi palle sisse, värviliste pallide väärtus kasvab ühe võrra, ehk
* 27 - 2 (kollane pall) = 25; 25 - 3 (roheline) = 22; 22 - 4 (pruun) = 18; 18 - 5 (sinine) = 13; 13 - 6 (roosa) = 7; 7 - 7 (must)
