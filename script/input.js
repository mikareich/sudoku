sudokuTablesAsArray.forEach(td => td.addEventListener("click", input));
const optionContainer = document.getElementById("options");
function input(eTd) {
  optionContainer.classList.remove("invisible");

  eTd.target.classList.add("current");
  window.addEventListener("click", eWindow => {
    if (eWindow.target == document.body) {
      eTd.target.classList.remove("current");
      optionContainer.classList.add("invisible");
    } else if (eWindow.target.className == "option") {
      if (eWindow.target.id == "null") eTd.target.textContent = "";
      else eTd.target.textContent = eWindow.target.textContent;
    }
  });
}
