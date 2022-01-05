import Solver from '../Solver'
import Sudoku from '../Sudoku'
import { formatedSudokuPlain, sudokuPlain } from './SudokuPlain'

test('Exact Cover method', () => {
  const sudoku = new Sudoku(sudokuPlain)

  Solver.EXACT_COVER(sudoku)

  expect(sudoku.plain[2].candidates).toStrictEqual([1, 2, 4])
  expect(sudoku.plain[3].candidates).toStrictEqual([2, 6])
  expect(sudoku.plain[58].candidates).toStrictEqual([3, 5])
})

test('Solves sudoku in time', async () => {
  const maxTime = 1000

  const sudoku = new Sudoku(sudokuPlain)
  const solver = new Solver(sudoku)

  const { runtime, solved } = await solver.solve()

  expect(runtime).toBeLessThan(maxTime)
  expect(solved).toStrictEqual(true)
  expect(sudoku.plain).toStrictEqual(formatedSudokuPlain)
})
