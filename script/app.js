import SudokuSolver from "./solver.js";

const sudokuPath = "../assets/sudoku.template.js";
const sudokuContainerDIV = document.querySelector(".sudoku-container");
const blocksDIV = [...sudokuContainerDIV.querySelectorAll(".block")];
const cellsDIV = blocksDIV.map((block) => block.querySelectorAll(".cell"));

async function fetchSudoku() {
  const { default: sudoku } = await import(sudokuPath);
  const solver = new SudokuSolver(sudoku);

  solver.split();

  solver.blocks.forEach((block, x) =>
    block.forEach((cell, y) => (cellsDIV[x][y].textContent = cell))
  );
}

fetchSudoku();
