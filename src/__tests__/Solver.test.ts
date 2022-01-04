import Solver from '../Solver'
import Sudoku from '../Sudoku'
import { sudokuPlain } from './SudokuPlain'

test('Exact Cover method', () => {
  const sudoku = new Sudoku(sudokuPlain)
  Solver.EXACT_COVER(sudoku)

  expect(sudoku.plain[2].candidates).toStrictEqual([1, 2, 4])
  expect(sudoku.plain[3].candidates).toStrictEqual([2, 6])
  expect(sudoku.plain[58].candidates).toStrictEqual([3, 5])
})
