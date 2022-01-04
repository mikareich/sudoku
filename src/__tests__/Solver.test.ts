import Solver from '../Solver'
import Sudoku from '../Sudoku'
import { sudokuSolvedPlain } from './SudokuPlain'

test('Solved property', () => {
  const sudokuSolved = new Sudoku(sudokuSolvedPlain)
  const solver = new Solver(sudokuSolved)

  expect(solver.solved).toBe(true)
})
