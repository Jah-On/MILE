import {windowLeave, pageSave, importMIL,
        exportMIL, onTextInput 
} from "./events.js"
import {
  addProblem, backToHome
} from "./MILE_ui.js"
import * as project from "./js/project/ui.js"
// Main entry point

// window.addEventListener("beforeunload", windowLeave);
// window.addEventListener("keydown", pageSave);
window.addEventListener("load", () => {
  project.loadAll();
  document.getElementById("addProject").addEventListener(
    "click", project.add
  );
  document.getElementById("backButton").addEventListener("click", backToHome);
  document.getElementById("importButton").addEventListener("click", importMIL);
  // document.getElementById("exportButton").addEventListener("click", exportMIL);
  document.getElementById("printButton").addEventListener("click", 
    () => { window.print(); }
  );
  document.getElementById("addNew").addEventListener("click", 
    () => { addProblem(""); }
  );
  // for (const problemRow of document.getElementsByClassName("problemListRow")) {
  //   addProblemListeners(problemRow);
  // }
  document.getElementById("inputArea").addEventListener("input", onTextInput);
});