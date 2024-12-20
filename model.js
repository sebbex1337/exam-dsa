import { Grid } from "./datastructures/grid.js";
import { PriorityQueue } from "./datastructures/priorityqueue.js";

let openList = new PriorityQueue();
let closedList = new Set();
let wallList = new Set();
let cameFrom = new Map();

/**
 *
 * @param {Number} ms number of seconds to delay
 * @returns A promise // kig lidt mere på hvad den præcis returnerer
 */
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @param {Object} a {row, col}
 * @param {Object} b {row, col}
 * @returns Den absolute værdi af (a.row - b.row) + (a.col - b.col)
 */
export function manhattenHeuristic(a, b) {
  // Manhatten distance |row1 - row2| + |col1 - col2|
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

/**
 *
 * @param {Object} a {row, col}
 * @param {Object} b {row, col}
 * @returns Returnerer den euklidiske distance mellem a og b. Også kaldet pythagoras sætning
 */
export function euclideanHeuristic(a, b) {
  // Euclidean distance sqrt((row1 - row2)^2 + (col1 - col2)^2)
  return Math.sqrt(Math.pow(a.row - b.row, 2) + Math.pow(a.col - b.col, 2));
}

/**
 *
 * @param {Object} a {row, col}
 * @param {Object} b {row, col}
 * @returns 0 - Vi returnerer 0 og gør at A* algoritmen bliver til Dijkstra's algoritme
 */
export function zeroHeuristic(a, b) {
  return 0;
}

/**
 *
 * @param {String} currentKey a set of {row,col}
 * @returns Array of {row,col} in reverse order
 */
function reconstructPath(currentKey) {
  const totalPath = [];
  let current = currentKey;
  while (current !== null) {
    const [row, col] = current.split(",").map(Number); // Vi splitter current og laver det om til et array af tal
    totalPath.push({ row, col }); // Vi tilføjer row og col til totalPath
    current = cameFrom.get(current); // Vi sætter current til dens forælder
  }
  return totalPath.reverse(); // Vi vender totalPath om, så vi får den rigtige rækkefølge
}

/**
 *
 * @param {Object} start {row: number, col: number}
 * @param {Object} end {row: number, col: number}
 * @param {Grid} grid Grid object
 * @param {Function} onStep  Function to call on each step
 * @param {Function} heuristic  Heuristic function to call on each cell
 * @returns Array of objects with row and col
 */
export async function A_star(start, end, grid, onStep, heuristic) {
  // Nulstil globale variabler
  openList = new PriorityQueue();
  closedList = new Set();
  wallList = new Set();
  cameFrom = new Map();

  const gScore = new Map();
  const fScore = new Map();

  openList.enqueue(start, 0); // Tilføj start og sæt dens prioritet til 0
  cameFrom.set(`${start.row},${start.col}`, null); // Vi har ikke nogen forælder til start, så vi sætter den til null

  gScore.set(`${start.row},${start.col}`, 0); // Vi sætter gScore til 0 for start
  fScore.set(`${start.row},${start.col}`, heuristic(start, end)); // Vi sætter fScore til heuristikken for start

  while (openList.size() > 0) { // O(n)
    const current = openList.dequeue(); // Tag den node med laveste fScore
    const currentKey = `${current.data.row},${current.data.col}`; // Lav en key til current

    // Kald onStep hvis vi har en funktion
    if (onStep) {
      onStep(current);
      await delay(200); // Vent 200ms
    }

    // Hvis vi er nået til end, så er vi færdige
    if (current.data.row === end.row && current.data.col === end.col) {
      const path = reconstructPath(currentKey);
      return path;
    }

    closedList.add(currentKey); // Tilføj current til closedList

    const neighbours = grid.neighbours(current.data.row, current.data.col); // Find naboer til current
    for (const neighbour of neighbours) {
      const neighbourKey = `${neighbour.row},${neighbour.col}`; // Lav en key til neighbour

      // Tjek om nabo er en væg eller ej
      const neighbourCell = grid.get(neighbour.row, neighbour.col);
      if (neighbourCell.wall) {
        console.log(`skipping wall at (${neighbour.row}, ${neighbour.col})`);
        wallList.add(neighbourKey);
        continue;
      }

      if (closedList.has(neighbourKey)) {
        continue; // Hvis vi allerede har besøgt naboen, så fortsæt
      }

      const tentative_gScore = gScore.get(currentKey) + 1; // Vi tager gScore for current og lægger 1

      if (!gScore.has(neighbourKey) || tentative_gScore < gScore.get(neighbourKey)) {
        // Hvis vi ikke har besøgt naboen eller den nye gScore er mindre end den gamle
        cameFrom.set(neighbourKey, currentKey);
        gScore.set(neighbourKey, tentative_gScore);
        fScore.set(neighbourKey, tentative_gScore + heuristic(neighbour, end));

        if (!openList.contains(neighbour)) {
          openList.enqueue(neighbour, fScore.get(neighbourKey)); // O(n)
        }
      }
    }
  }

  return null;
}

export function getOpenList() {
  return openList.toArray();
}

export function getClosedList() {
  return Array.from(closedList).map((key) => {
    const [row, col] = key.split(",").map(Number);
    return { row, col };
  });
}

export function getCameFrom() {
  return Array.from(cameFrom.entries()).map(([key, value]) => {
    return { key, value };
  });
}

export function getWallList() {
  return Array.from(wallList).map((key) => {
    const [row, col] = key.split(",").map(Number);
    return { row, col };
  });
}
