import Sudoku from './Sudoku'

interface SolverInfo {
  runtime: number
  solved: boolean
  sudoku: Sudoku
}
class Solver {
  /** Sudoku to solve */
  public sudoku: Sudoku

  constructor(sudoku: Sudoku) {
    this.sudoku = sudoku
  }

  async solve(): Promise<SolverInfo> {
    const startTimestamp = Date.now()
    while (!this.sudoku.solved) {
      // use exact cover method to update candidates
      Solver.EXACT_COVER(this.sudoku)

      let cellFilled = false
      // fill cells with only one candidate
      this.sudoku.plain.forEach((cell) => {
        if (cell.candidates.length === 1) {
          cellFilled = true
          // eslint-disable-next-line prefer-destructuring
          cell.value = cell.candidates[0]
          cell.candidates = []
        }
      })

      if (!cellFilled) throw new Error('No solution found')
    }

    const endTimestamp = Date.now()
    const runtime = endTimestamp - startTimestamp

    return { sudoku: this.sudoku, runtime, solved: this.sudoku.solved }
  }

  /**
   * Updates candidates of cells based on the exact cover method
   *
   * Updates candidates based on the intersection of the digit candidates of the corresponding units
   * @param sudoku Sudoku to solve
   * @returns Updated sudoku
   */
  static EXACT_COVER(sudoku: Sudoku): Sudoku {
    sudoku.plain.forEach((cell, cellIndex) => {
      // skip if cell is already filled
      if (cell.value === 0) {
        const { row, col, block } = sudoku.getUnitsByPlainIndex(cellIndex)

        const rowCandidates = Sudoku.getDigitSet(row)
        const colCandidates = Sudoku.getDigitSet(col)
        const blockCandidates = Sudoku.getDigitSet(block)

        const candidates = cell.candidates.filter(
          (candidate) =>
            !rowCandidates.includes(candidate) &&
            !colCandidates.includes(candidate) &&
            !blockCandidates.includes(candidate)
        )

        cell.candidates = candidates
      }
    })

    return sudoku
  }
}

export default Solver
