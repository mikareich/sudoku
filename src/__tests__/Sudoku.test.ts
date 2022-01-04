import Sudoku, { DigitSetWithZero } from '../Sudoku'

const sudokuPlain: DigitSetWithZero = [
  5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 6,
  0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4, 0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2, 0, 0,
  0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0, 0, 0, 8, 0,
  0, 7, 9,
]

test('Sudoku returns correct units of cell with given plain index', () => {
  const sudoku = new Sudoku(sudokuPlain)
  const units = sudoku.getUnitsByPlainIndex(12)

  expect(units.row).toEqual([6, 0, 0, 1, 9, 5, 0, 0, 0])
  expect(units.col).toEqual([0, 1, 0, 0, 8, 0, 0, 4, 0])
  expect(units.block).toEqual([0, 7, 0, 1, 9, 5, 0, 0, 0])
})

test('Sudoku returns correct untis of cell with given row and col index', () => {
  const sudoku = new Sudoku(sudokuPlain)
  const units = sudoku.getUnitsByRowCol(1, 3)

  expect(units.row).toEqual([6, 0, 0, 1, 9, 5, 0, 0, 0])
  expect(units.col).toEqual([0, 1, 0, 0, 8, 0, 0, 4, 0])
  expect(units.block).toEqual([0, 7, 0, 1, 9, 5, 0, 0, 0])
})

test('Format plain to rows', () => {
  const rows = Sudoku.formatToRows(sudokuPlain)
  expect(rows).toStrictEqual([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ])
})

test('Format plain to cols', () => {
  const cols = Sudoku.formatToCols(sudokuPlain)
  expect(cols).toStrictEqual([
    [5, 6, 0, 8, 4, 7, 0, 0, 0],
    [3, 0, 9, 0, 0, 0, 6, 0, 0],
    [0, 0, 8, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 8, 0, 0, 4, 0],
    [7, 9, 0, 6, 0, 2, 0, 1, 8],
    [0, 5, 0, 0, 3, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 6, 0, 0, 0, 8, 0, 7],
    [0, 0, 0, 3, 1, 6, 0, 5, 9],
  ])
})

test('Format plain to blocks', () => {
  const blocks = Sudoku.formatToBlocks(sudokuPlain)
  expect(blocks).toStrictEqual([
    [5, 3, 0, 6, 0, 0, 0, 9, 8],
    [0, 7, 0, 1, 9, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 4, 0, 0, 7, 0, 0],
    [0, 6, 0, 8, 0, 3, 0, 2, 0],
    [0, 0, 3, 0, 0, 1, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 1, 9, 0, 8, 0],
    [2, 8, 0, 0, 0, 5, 0, 7, 9],
  ])
})
