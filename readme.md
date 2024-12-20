# Eksamensemne: A* (A-star)
Dato: 6 Januar 2025 <br>
Studerende: Sebastian Juel Sefort og Sofie Amalie Romer Larsen 

Github Repo: https://github.com/sebbex1337/exam-dsa <br>
Github Pages: https://sebbex1337.github.io/exam-dsa/ <br>

<image src="./assets/a-star.png">


## Forklaring af visualisering
For at vise hvordan A* (star) algoritmen fungerer har vi valgt at visualisere den i en gitterbaseret miljø.
Her har du som bruger mulighed for at vælge din start celle og din slut celle, du har også mulighed for at sætte vægge op, som algoritmen ikke kan gå igennem. 

Når du har valgt din start og slut celle, og trykker start begynder algoritmen at beregne den korte vej fra start til slut. Det gør den ved at evaluere de omkringliggende celler ved at fremhæve dem i forskellige farver, hvilket illustrerer algoritmens beregninger.

Under gitteret har vi visualiseret algoritmens fremgangsmåde hvor den starter med at placere de celler den gerne vil evaluere i “open list”, og slutter dem herefter over i “closed list” når evalueringen er færdig. 


Algoritmen anvender en heuristik til at estimere afstanden fra de aktuelle celler til slut cellen, det er den som styrer søgeprocessen. Når algoritmen har nået målet, vil den fremhæve den korteste vej fra start til slut. 


## Algoritme
I vores program bruges A*(star) til at beregne den korteste vej fra start til slut.

A* Algoritmen vurderer, hvilken vej der er kortest mellem start og slut ved at beregne, hvor langt vi allerede er, og hvor langt der ser ud til at være til slutcellen. Dette gør den ved hjælp af heuristikker såsom Manhattan distance til at beregne længden fra en aktuel celle til slut cellen. 

A* evaluerer hver celle baseret på f(n) = g(n) + h(n) hvor g(n) er den korteste vej fra start cellen til den celle vi vil evaluere og h(n) er en heuristik der estimerer den korteste vej fra vores nuværende celle til slutcellen. 

Algoritmen har en “åben liste” som er et sæt af koordinator der skal evalueres, og en “lukket liste” hvor kordinator som er blivet evalueret bliver rykket hen i. Algoritmens “åben liste” gør brug af en prioritetskø, der sørger for at hver sæt af koordinater har den laveste prioritet værdi. Den vil altid prioritere ud fra det sæt koordinater der har den laveste f-score.

Algoritmen vil søge så længe der er koordinater i vores åbne liste eller den har fundet slut cellen og dermed fundet en vej i gitteret.
Vores PriorityQueue datastruktur bruger O(log n) til at enqueue elementer da den altid skal sætte elementet med laveste f score (prioritet) først. 

Vores A* (star) algoritme har en køretid på O(n^2) da vi gør brug af et while loop der skal itererer over n elementer i vores “åben liste”. Udover dette så tager det også O(n) køretid at enqueue elementer til vores PriorityQueue da den bruger en Linked List til at holde styr på køen.

For at forbedre algoritmens køretid kunne vi have gjort brug af en Heap Priority Queue der gør at vores enqueue ville have en O(log n) køretid. Dette vil resulterer i at vores algoritme får en køretid på O(n log n).

## Datastruktur
Vi har valgt at bruge en prioritetskø til vores A* (star) algoritme. Dette gør at vi kan give hver node (celle) et tal der bestemmer om den vej algoritmen går er den bedste vej. Prioritetskøen har funktioner til at tilføje (enqueue) og fjerne (dequeue). Når vi tilføjer en node til vores kø, skal vi give den en prioritet med. Enqueue opdaterer automatisk køen så den med lavest prioritet ligger først (head). Dette gør at man kan bruge dequeue til at få den node med lavest prioritet. Vi har lavet en funktion til at tjekke om en node (celle) allerede er i køen så der ikke kommer dubletter i vores kø.

Vi har valgt at bruge et 2D Grid til at holde styr på vores noder (celler). Vores Grid implementation kan håndtere 4 naboer (op, højre, ned, venstre). Vores grid har en funktion, kaldet neighbours der returnerer alle mulige naboer til en node (celle). Denne funktion gør vi brug af i A* (star) algoritmen til at hente alle naboer til en celle for så efterfølgende at tjekke om naboen er en væg eller ej.

Vores Grid håndterer også om en node (celle) er en væg ved hjælp af funktionen toggleWall. Den opdaterer en nodes wall til at være true eller false, afhængigt af hvad den var tidligere.

## Visualisering 
For at visualisere A* (star) algoritmen gør vi brug af en Prioritetskø og et 2D Grid. På siden viser vi Open List, Closed List og Wall List. Open List viser de celler vi mangler at tjekke samt deres f score (prioritet). Det er også her man kan se at den celle med lavest f score (prioritet) altid vil være øverst. Closed List viser de celler der allerede er besøgt og ikke længere skal tjekkes. Wall List viser de celler der er vægge og derfor er blevet ignoreret af A* (star) algoritmen.

Vores Grid gør brug af CSS til at fremhæve 6 forskellige elementer. Vi gør brug af en grøn og rød farve til henholdsvis start og slut. Vægge er farvet med en meget grå farve. Når A* (star) søger efter en vej fra start til slut, markerer den celler der er blevet besøgt med farven gul for at indikerer hvordan den søger. Når A* (star) har fundet en vej fra start til slut fremhæves den korteste vej fra start til slut med en grøn farve.

A* (star) Algoritmen gør brug af heuristikker til at vælge den korteste vej fra en aktuel celle til slut cellen. Vi har valgt at implementerer 3 forskellige heuristikker som en bruger kan vælge mellem for at se hvordan A* (star) søger efter slut cellen.

## Pseudocode for algoritmen
<image src="./assets/pesudokode a-star.png">
Billedet  viser vores pseudokode for A* (star) algoritmen vi har implementeret. 

Vi startede med at kunne tilføje cellerne start og slut til openList, samt give dem en g og f score. Herefter gik vi i gang med at implementerer vores while loop der tjekker om openList er tom. 
I vores while loop skal vi først hente den celle med lavest f score (højeste prioritet). Herefter startede vi med at tjekke om start og slut var fundet på nuværende celle, for så skal vi afslutte søgningen, da vejen er fundet. 

Herefter gik vi i gang med at hente alle naboer til den nuværende celle, for at kunne itererer over dem. Når vi tjekker hver nabo til den nuværende celle, tjekker vi først om det er en væg, og så om den allerede er evalueret. 

Til sidst opdaterer vi cellens g og f score, samt tilføjer den nuværende nabo celle til vores openList, så dens naboer kan blive evalueret.

Billedet nedenfor viser hvordan vi har implementeret, hvordan vi tjekker hver nabo celle.

<image src="./assets/kode a-star.png">

Vi henter hver nabo ved at kalde grid.neighbours med den nuværende celles row og col. 

Dette gør, at vi kan itererer over hver nabo i vores liste over naboer. 

Vi tjekker først om naboen er en væg, så tjekker vi om den er allerede besøgt og til sidst tjekker vi om vi allerede har beregnet dens g score og om den nye g score er lavere end den tidligere givet g score.


## Inspiration links: 
https://en.wikipedia.org/wiki/A*_search_algorithm <br>
https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2 <br>
Derudover har vi brugt Claude.ai og ChatGPT som sparringspartner. 
