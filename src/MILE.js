import {windowLeave, pageSave, importMIL,
        exportMIL, onTextInput 
} from "./events.js"
import {addProblem, backToBase, addProblemListeners } from "./MILE_ui.js"

// Main entry point

window.addEventListener("beforeunload", windowLeave);
// window.addEventListener("keydown", pageSave);
window.addEventListener("load", () => {
  document.getElementById("baseForm").addEventListener("submit", 
    (event) => {
      addProblem(event, "");
      event.target.children[0].value = "";
    }
  );
  document.getElementById("backToBase").addEventListener("click", backToBase);
  document.getElementById("printButton").addEventListener("click", 
    () => { window.print(); }
  );
  document.getElementById("importButton").addEventListener("click", importMIL);
  document.getElementById("exportButton").addEventListener("click", exportMIL);
  for (const problemRow of document.getElementsByClassName("problemListRow")) {
    addProblemListeners(problemRow);
  }
  document.getElementById("inputArea").addEventListener("input", onTextInput);
  let documentName = prompt("Enter in a project name:", "MILE_Project");
  document.body.setAttribute("name", documentName);
});