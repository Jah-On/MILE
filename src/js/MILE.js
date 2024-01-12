import * as problem  from "./problem/ui.js"
import * as project  from "./project/ui.js"
import * as storage  from "./storage/util.js"
import * as keyInput from "./input/key.js"
// Main entry point

// window.addEventListener("beforeunload", windowLeave);
window.addEventListener("load", () => {
  project.loadAll();
  document.getElementById("addProject").addEventListener(
    "click", project.add
  );
  document.getElementById("closeRevisions").addEventListener(
    "click", project.closeRevisions
  );
  document.getElementById("backButton").addEventListener("click", problem.backToHome);
  document.getElementById("importButton").addEventListener("click", storage.upload);
  document.getElementById("exportButton").addEventListener("click", storage.download);
  document.getElementById("printButton").addEventListener("click", 
    () => { window.print(); }
  );
  document.getElementById("addNew").addEventListener("click", 
    () => { problem.add(""); }
  );
  document.getElementById("inputArea").addEventListener("input",   keyInput.handleInput);
  document.getElementById("inputArea").addEventListener("keydown", keyInput.handleKeyDown);
  document.getElementById("inputArea").addEventListener("paste",   problem.saveRowData);
});