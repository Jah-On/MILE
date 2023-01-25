import { windowLeave, printOutput } from "./events.js"
import { addNewInput, backToBase } from "./MILE_ui.js"

window.addEventListener("beforeunload", windowLeave);
document.getElementById("baseForm").addEventListener("submit", addNewInput);
document.getElementById("backToBase").addEventListener("click", backToBase);
document.getElementById("printButton").addEventListener("click", printOutput);