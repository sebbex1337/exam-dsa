
```
function A-star(start, slut, grid)
  Initialiser en tom åbenkø 
  Initialiser en tom lukketkø
  Initialiser en tom kommetfra Map

  g(x) repræsenterer afstand fra start til nuværende celle
  f(x) repræsenterer den totale afstand fra start til slut beregnet med g(x) + heuristic(x)

  tilføje start til åbenkø
  sæt g(start) til at være 0
  f(start) sættes ved hjælp af (g(start) + heuristic(slut))

  mulige veje at gå: op, højre, ned, venstre

  så længe åbenkø ikke er tom
    vi henter den celle fra åbenkø der har lavest f(x)

    tjek om nuværende celle er lig slut
      hvis den er det laver vi stien fra start til slut
    
    fjern nurværende celle fra åbenkø
    tilføj nuværende celle til lukketkø

    for hver mulig vej
      nabo = nuværende celle + mulig vej // f.eks. op

      tjek om nabo er i gridet
        fortsæt
      tjek om nabo er væg
        fortsæt
      tjek om nabo er i lukketkø
        fortsæt
      
      løbende beregning af g(x) fra start til nuværende celle til nabo hvor nabo altid vil være + 1

      tjek om nabo ikke er i åbenkø
        hvis den ikke er i åbenkø tilføjer vi nabo til åbenkø
      ellers tjek om løbende beregning af g(x) er større eller mindre end g(nabo)
        fortsæt

      tilføj nuværende til kommetfra
      g(nabo) sættes til at være løbende beregning af g(x)
      beregn f(x) med nabo celle

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