import { Grid } from "./datastructures/grid.js";
import * as view from "./view.js";

// Start visning af gridet
window.addEventListener("load", init);

let grid;

function init() {
  grid = new Grid({ row: 10, col: 10 });
  view.initGrid(grid);
}
