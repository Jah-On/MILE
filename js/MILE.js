import {windowLeave, printOutput} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/events.js"
import {addNewInput, backToBase} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/MILE_ui.js"

window.addEventListener("beforeunload", windowLeave);
document.getElementById("baseForm").addEventListener("submit", addNewInput);
document.getElementById("backToBase").addEventListener("click", backToBase);
document.getElementById("printButton").addEventListener("click", printOutput);