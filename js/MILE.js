import {windowLeave, printOutput} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/events.js"
import {addNewInput, backToBase} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/MILE_ui.js"

window.addEventListener("beforeunload", windowLeave);
document.getElementById("baseForm").addEventListener("submit", addNewInput);
document.getElementById("backToBase").addEventListener("click", backToBase);
document.getElementById("printButton").addEventListener("click", printOutput);

let existingProblemRows = document.getElementsByClassName("problemListRow");
for (let index = 0; index < existingProblemRows.length; ++index){
    existingProblemRows[index].children[0].addEventListener("input", updateName);
    existingProblemRows[index].children[1].addEventListener("click", moveInputUp);
    existingProblemRows[index].children[2].addEventListener("click", moveInputDown);
    existingProblemRows[index].children[3].addEventListener("click", copyInput);
    existingProblemRows[index].children[4].addEventListener("click", deleteInput);
    existingProblemRows[index].children[5].addEventListener("click", editInput);
}