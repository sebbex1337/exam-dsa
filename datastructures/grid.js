// Grid.js
export class Grid {
  constructor(rowOrObj, cols) {
    const { row: rows, col: columns } = this.parseRowCol(rowOrObj, cols);
    this.rowsNum = rows;
    this.colsNum = columns;
    this.grid = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: columns }, (_, col) => ({
        row,
        col,
        visited: false,
        north: true,
        south: true,
        east: true,
        west: true,
        parent: null,
      }))
    );
  }

  parseRowCol(rowOrObj, col) {
    if (typeof rowOrObj === "object") {
      return { row: rowOrObj.row, col: rowOrObj.col };
    }
    return { row: rowOrObj, col };
  }

  set(rowOrObj, colOrValue, value) {
    const { row, col } = this.parseRowCol(rowOrObj, colOrValue);
    const val = value !== undefined ? value : colOrValue;
    this.grid[row][col] = { ...this.grid[row][col], ...val };
  }

  get(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.grid[row]?.[column];
  }

  indexFor(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return row * this.colsNum + column;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.colsNum);
    const col = index % this.colsNum;
    return { row, col };
  }

  neighbours(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    const neighbours = [];
    if (row > 0) {
      neighbours.push({ row: row - 1, col: column }); // North
    }
    if (row < this.rowsNum - 1) {
      neighbours.push({ row: row + 1, col: column }); // South
    }
    if (column > 0) {
      neighbours.push({ row, col: column - 1 }); // West
    }
    if (column < this.colsNum - 1) {
      neighbours.push({ row, col: column + 1 }); // East
    }
    return neighbours;
  }

  neighbourValues(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    return this.neighbours(row, column).map(({ row, col: neighborCol }) => this.get(row, neighborCol));
  }

  nextInRow(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column < this.colsNum - 1) {
      return { row, col: column + 1 };
    }
    return undefined;
  }

  nextInCol(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row < this.rowsNum - 1) {
      return { row: row + 1, col: column };
    }
    return undefined;
  }

  north(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row > 0) {
      return { row: row - 1, col: column };
    }
    return undefined;
  }

  south(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (row < this.rowsNum - 1) {
      return { row: row + 1, col: column };
    }
    return undefined;
  }

  west(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column > 0) {
      return { row, col: column - 1 };
    }
    return undefined;
  }

  east(rowOrObj, col) {
    const { row, col: column } = this.parseRowCol(rowOrObj, col);
    if (column < this.colsNum - 1) {
      return { row, col: column + 1 };
    }
    return undefined;
  }

  rows() {
    return this.rowsNum;
  }

  cols() {
    return this.colsNum;
  }

  size() {
    return this.rowsNum * this.colsNum;
  }

  fill(value) {
    for (let row = 0; row < this.rowsNum; row++) {
      for (let col = 0; col < this.colsNum; col++) {
        this.set(row, col, value);
      }
    }
  }
}
