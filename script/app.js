const sudokuTable = document.getElementById("sudoku");
const sudokuTablesAsArray = Array.from(document.getElementsByTagName("td"));
var change = true;
var solved = false;
const blocks = [
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 0,
    column: 0
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 0,
    column: 3
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 0,
    column: 6
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 3,
    column: 0
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 3,
    column: 3
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 3,
    column: 6
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 6,
    column: 0
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 6,
    column: 3
  },
  {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    fields: [],
    line: 6,
    column: 6
  }
];
var values = sudokuTablesAsArray.map(child => {
  const positionAsNumber = sudokuTablesAsArray.indexOf(child) / 9;
  // Position in Sudoku
  const position = {
    column: Math.floor((positionAsNumber - Math.floor(positionAsNumber)) * 10),
    line: Math.floor(positionAsNumber),
    block: undefined
  };
  // Block in Sudoku
  blocks.forEach(block => {
    if (
      position.line >= block.line &&
      position.line <= block.line + 3 &&
      position.column >= block.column &&
      position.column <= block.column + 3
    ) {
      position.block = block;
    }
  });
  const field = {
    position: position,
    value: parseInt(child.innerHTML) || null,
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    dom: child
  };
  field.position.block.fields.push(field);
  return field;
});

function getPossibleNumbers(field1, area) {
  // Zahlen in Zeile ausgeben
  var numbers = values.filter(
    field2 => field2 && field2.position[area] == field1.position[area]
  );
  numbers = numbers.map(field => field.value);

  // Zahlen ausschliesen
  field1.options.forEach((value, index, array) => {
    if (numbers.includes(value)) {
      change = true;
      delete array[index];
    }
  });
  field1.options = field1.options.filter(n => n !== undefined);
  return field1.options;
}

function blockArea(positionField, area) {}

function solve(field) {
  if (field.value != null || !field) return field;
  const areas = ["line", "column", "block"].map(area => ({
    area: area,
    numbers: getPossibleNumbers(field, area)
  }));
  if (field.options.length == 1) {
    field.value = field.options[0];
    field.dom.innerText = field.value;
  }
  const nextBlocks = blocks.filter(
    block =>
      block != field.position.block &&
      (field.position.block.column == block.column ||
        field.position.block.line == block.line)
  );
  return field;
}
function start() {
  const startTime = new Date().getTime()
  while (change && !solved) {
    change = false;
    values.forEach((value, index, array) => {
      array[index] = solve(value);
    });
    if (values.filter(n => n.value == null).length == 0) {
      solved = true;
      document.getElementById("resultTime").innerText = new Date().getTime() - startTime
    }
  }
}
