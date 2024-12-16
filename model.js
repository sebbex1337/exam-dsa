import { Grid } from "./datastructures/grid.js";
import { PriorityQueue } from "./datastructures/priorityqueue.js";

let openList = new PriorityQueue();
let closedList = new Set();
let cameFrom = new Map();

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function heuristic(a, b) {
  // Manhatten distance |row1 - row2| + |col1 - col2|
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function reconstructPath(currentKey) {
  const totalPath = [];
  let current = currentKey;
  while (current !== null) {
    console.log(current);
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
 * @returns Array of objects with row and col
 */
export async function A_star(start, end, grid, onStep) {
  // Nulstil globale variabler
  openList = new PriorityQueue();
  closedList = new Set();
  cameFrom = new Map();

  const gScore = new Map();
  const fScore = new Map();

  openList.enqueue(start, 0); // Tilføj start og sæt dens prioritet til 0
  cameFrom.set(`${start.row},${start.col}`, null); // Vi har ikke nogen forælder til start, så vi sætter den til null

  gScore.set(`${start.row},${start.col}`, 0); // Vi sætter gScore til 0 for start
  fScore.set(`${start.row},${start.col}`, heuristic(start, end)); // Vi sætter fScore til heuristikken for start

  while (openList.size() > 0) { // TODO: Vi skal tjekke for vægge også
    const current = openList.dequeue(); // Tag den node med laveste fScore
    const currentKey = `${current.row},${current.col}`; // Lav en key til current

    // Kald onStep hvis vi har en funktion
    if (onStep) {
      onStep(current);
      await delay(200); // Vent 500ms
    }

    // Hvis vi er nået til end, så er vi færdige
    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(currentKey);
      return path;
    }

    closedList.add(currentKey); // Tilføj current til closedList

    const neighbours = grid.neighbours(current.row, current.col); // Find naboer til current
    // console.log(neighbours.map((n) => `${n.row},${n.col}`));
    for (const neighbour of neighbours) {
      const neighbourKey = `${neighbour.row},${neighbour.col}`; // Lav en key til neighbour

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
          openList.enqueue(neighbour, fScore.get(neighbourKey));
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
