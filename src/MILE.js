import {windowLeave, pageSave, importMIL,
        exportMIL, onTextInput 
} from "./events.js"
import {addProblem, backToBase, addProblemListeners } from "./MILE_ui.js"

// Main entry point

window.addEventListener("beforeunload", windowLeave);
// window.addEventListener("keydown", pageSave);
window.addEventListener("load", () => {
  document.getElementById("backToBase").addEventListener("click", backToBase);
  document.getElementById("importButton").addEventListener("click", importMIL);
  document.getElementById("exportButton").addEventListener("click", exportMIL);
  document.getElementById("printButton").addEventListener("click", 
    () => { window.print(); }
  );
  document.getElementById("addNew").addEventListener("click", 
    () => { addProblem(""); }
  );
  for (const problemRow of document.getElementsByClassName("problemListRow")) {
    addProblemListeners(problemRow);
  }
  document.getElementById("inputArea").addEventListener("input", onTextInput);
  let documentName = prompt("Enter in a project name:", "MILE_Project");
  document.body.setAttribute("name", documentName);
});