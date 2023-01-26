import { windowLeave, printOutput } from "./events.js"
import { addNewInput, backToBase } from "./MILE_ui.js"

// Main entry point

window.addEventListener("beforeunload", windowLeave);
window.addEventListener("load", () => {
  document.getElementById("baseForm").addEventListener("submit", addNewInput);
  document.getElementById("backToBase").addEventListener("click", backToBase);
  document.getElementById("printButton").addEventListener("click", printOutput);
});