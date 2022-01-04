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

    const sortAndStringify = (unit: Unit) =>
      JSON.stringify(Sudoku.getDigitSet(unit).sort())
    const numberSequenceStringified = JSON.stringify(Sudoku.DIGIT_SET)

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

  /**
   * Updates candidates of cells based on the exact cover method
   *
   * Updates candidates based on the intersection of the digit candidates of the corresponding units
   * @param sudoku Sudoku to solve
   * @returns Updated sudoku
   */
  static EXACT_COVER(sudoku: Sudoku): Sudoku {
    for (let cellIndex = 0; cellIndex < sudoku.plain.length; cellIndex += 1) {
      const cell = sudoku.plain[cellIndex]
      // skip if cell is already filled
      if (cell.value === 0) {
        const { row, col, block } = sudoku.getUnitsByPlainIndex(cellIndex)

        const rowCandidates = Sudoku.getDigitSet(row)
        const colCandidates = Sudoku.getDigitSet(col)
        const blockCandidates = Sudoku.getDigitSet(block)

        cell.candidates = cell.candidates.filter(
          (candidate) =>
            !rowCandidates.includes(candidate) &&
            !colCandidates.includes(candidate) &&
            !blockCandidates.includes(candidate)
        )
      }
    }

    return sudoku
  }
}

export default Solver
