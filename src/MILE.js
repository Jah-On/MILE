import {windowLeave, printOutput, pageSave, importMIL,
        exportMIL, inputElementTyping} from "./events.js"
import {addNewInput, backToBase, updateName, moveInputUp,
        moveInputDown, copyInput, deleteInput, editInput} from "./MILE_ui.js"

// Main entry point

window.addEventListener("beforeunload", windowLeave);
window.addEventListener("keydown", pageSave);
window.addEventListener("load", () => {
  document.getElementById("baseForm").addEventListener("submit", addNewInput);
  document.getElementById("backToBase").addEventListener("click", backToBase);
  document.getElementById("printButton").addEventListener("click", printOutput)
  document.getElementById("importButton").addEventListener("click", importMIL);
  document.getElementById("exportButton").addEventListener("click", exportMIL);
  for (const problemRow of document.getElementsByClassName("problemListRow")) {
    problemRow.children[0].addEventListener("input", updateName);
    problemRow.children[1].addEventListener("click", moveInputUp);
    problemRow.children[2].addEventListener("click", moveInputDown);
    problemRow.children[3].addEventListener("click", copyInput);
    problemRow.children[4].addEventListener("click", deleteInput);
    problemRow.children[5].addEventListener("click", editInput);
  }
  for (const inputElement of document.getElementsByClassName("input")) {
    inputElement.addEventListener("input", inputElementTyping);
    inputElement.value = existingInputs[index].getAttribute("value");
  }
  let documentName = prompt("Enter in a project name:", "MILE_Project");
  let documentNameElement = document.createElement("div");
  documentNameElement.id = "documentName";
  documentNameElement.setAttribute("name", documentName);
  documentNameElement.hidden = true;
  document.body.append(documentNameElement);
});