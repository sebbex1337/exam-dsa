
```
function A-star(start, slut, grid)
  openList = Initialiser en tom åbenkø 
  closedList = Initialiser et tomt Set
  cameFrom = Initialiser et tomt Map til genskabning af bedste vej

  g(x) repræsenterer afstand fra start til nuværende celle
  f(x) repræsenterer den totale afstand fra start til slut beregnet med g(x) + heuristic(x)

  tilføje start celle til åbenkø med 0 f score
  sæt g(start) til at være 0
  f(start) sættes ved hjælp af (g(start) + heuristic(slut))

  så længe åbenkø ikke er tom
    vi henter den celle fra åbenkø der har lavest f score (det vil sige den første i køen)
    fjern cellen fra åbenkø (så vi ikke tjekker den igen)

    tjek om nuværende celle er lig slut cellen
      hvis den er det laver vi stien fra start cellen til slut cellen
    hvis nuværende celle ikke er lig slut cellen
      fortsæt while loop

    tilføj nurværende celle til lukketkø

    for hver mulig vej // op, højre, ned, venstre
      nabo = nuværende celle vi tjekker

      tjek om nabo er væg
        tjek næste nabo
      tjek om nabo er i lukketkø // har vi været der?
        tjek næste nabo
      
      løbende beregning af g(x) fra start til nuværende celle til nabo hvor nabo altid vil være + 1

      tjek om nabo ikke er i åbenkø
        hvis den ikke er i åbenkø tilføjer vi nabo til åbenkø
      ellers tjek om løbende beregning af g(x) er større eller mindre end g(nabo)
        fortsæt

      tilføj nuværende til cameFrom
      g(nabo) sættes til at være løbende beregning af g(x)
      beregn f(x) med nabo celle

      Hvis nabo ikke er i openList
        tilføj nabo til openList

  return null // Ingen sti er fundet

heuristic bruger manhatten distance heuristic
function heuristic(position, goal)
  returnér den absolute værdi af (position.x - goal.x) + (position.y - goal.y)

function reconstruct_path(kommetfra, nuværende)
  sti sættes til nuværende
  så længe nuværende er i kommetfra
    nuværende er lig kommetfra[nuværende]
    tilføj nuværende forrest i stien
  return sti
```