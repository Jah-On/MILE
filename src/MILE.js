import {windowLeave, importMIL,
        exportMIL, onTextInput 
} from "./events.js"
import * as problem from "./js/problem/ui.js"
import * as project from "./js/project/ui.js"
// Main entry point

// window.addEventListener("beforeunload", windowLeave);
window.addEventListener("load", () => {
  project.loadAll();
  document.getElementById("addProject").addEventListener(
    "click", project.add
  );
  document.getElementById("backButton").addEventListener("click", problem.backToHome);
  document.getElementById("importButton").addEventListener("click", importMIL);
  document.getElementById("exportButton").addEventListener("click", exportMIL);
  document.getElementById("printButton").addEventListener("click", 
    () => { window.print(); }
  );
  document.getElementById("addNew").addEventListener("click", 
    () => { problem.add(""); }
  );
  document.getElementById("inputArea").addEventListener("input", onTextInput);
});