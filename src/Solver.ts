import Sudoku, { Unit } from './Sudoku'

class Solver {
  /** Sudoku to solve */
  public sudoku: Sudoku

  constructor(sudoku: Sudoku) {
    this.sudoku = sudoku
  }

  /** Indicates whether the sudoku is solved */
  get solved() {
    const { rows, cols, blocks } = this.sudoku

    const sortAndStringify = (arr: Unit) => JSON.stringify(arr.sort())
    const numberSequenceStringified = JSON.stringify(Sudoku.NUMBER_SEQUENCE)

    const rowsFilled = rows
      .map(sortAndStringify)
      .every((row) => row === numberSequenceStringified)

    const colsFilled = cols
      .map(sortAndStringify)
      .every((col) => col === numberSequenceStringified)

    const blocksFilled = blocks
      .map(sortAndStringify)
      .every((block) => block === numberSequenceStringified)

    return rowsFilled && colsFilled && blocksFilled
  }
}

export default Solver
