import { inputElementTyping } from "./events.js";
import { generateDisplayName } from "./helper.js";

const functionArray = [
    updateBaseOutput, moveInputUp, moveInputDown, copyInput, 
    deleteInput, editInput
];
const eventArray = [
    "input", "click", "click", "click", "click", "click"
];

export let fragmentMap = new Map();

export function addProblemListeners(problemRow) {
    for (let index = 0; index < eventArray.length; ++index) {
        problemRow.children[index].addEventListener(
            eventArray[index], functionArray[index]
        );
    }
}

export function moveInputUp(event) {
    let rowElement = event.target.parentNode;
    if (rowElement.previousSibling.id != "rowTemplate") {
        rowElement.parentNode.insertBefore(rowElement, rowElement.previousSibling);
    }
    updateBaseOutput();
}

export function moveInputDown(event) {
    let rowElement = event.target.parentNode;
    if (rowElement.nextSibling) {
        rowElement.parentNode.insertBefore(rowElement.nextSibling, rowElement);
    }
    updateBaseOutput();
}

export function copyInput(event) {
    let newUUID = crypto.randomUUID();
    fragmentMap.set(
        newUUID, 
        fragmentMap.get(event.target.parentNode.id).cloneNode(true)
    );
    let cloned  = event.target.parentNode.cloneNode(true);
    cloned.id = newUUID;
    cloned.children[0].value = generateDisplayName(cloned.children[0].value);
    addProblemListeners(cloned);
    event.target.parentNode.insertAdjacentElement("afterend", cloned);
    cloned.scrollIntoView();
    updateBaseOutput();
}

export function deleteInput(event) {
    event.target.parentNode.remove();
    fragmentMap.delete(event.target.parentNode.id);
    updateBaseOutput();
}

export function editInput(event) {
    document.getElementById("homeSpecific").style.display = "none";
    document.getElementById("problemList").style.display = "none";
    document.getElementById("backToBase").style.display = "flex";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "block";
    inputArea.focus();
    inputArea.setAttribute("UUID", event.target.parentNode.id);
    inputArea.innerText = event.target.parentNode.getAttribute("MIL");
    document.getElementById("output").replaceChildren(
        fragmentMap.get(event.target.parentNode.id).cloneNode(true)
    );
}

export function backToBase(event) {
    document.getElementById("homeSpecific").style.display = "flex";
    document.getElementById("problemList").style.display = "block";
    document.getElementById("backToBase").style.display = "none";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "none";
    updateBaseOutput();
}

export function newProblemRow(UUID, displayName) {
    let clone = document.getElementById("rowTemplate").cloneNode(true);
    clone.id = UUID;
    clone.style.display = "flex";
    clone.children[0].value = displayName;
    addProblemListeners(clone);
    return clone;
}

export function addProblem(event, displayName) {
    if (event) {
        displayName = event.target.children[0].value;
    }
    let UUID = crypto.randomUUID();
    fragmentMap.set(UUID, document.createDocumentFragment());
    let problemList = document.getElementById("problemList");
    problemList.appendChild(newProblemRow(UUID, displayName));
    problemList.lastChild.scrollIntoView();
    updateBaseOutput();
}

export function updateBaseOutput() {
    let temp = document.createDocumentFragment();

    let problems = [...document.getElementById("problemList").children];
    problems = problems.slice(1, problems.length);
    for (const problem of problems) {
        temp.append(document.createElement("div"));
        let divRef = temp.lastChild;
        divRef.className = "baseOutput";
        divRef.append(document.createElement("span"));
        if (problem.children[0].value) {
            divRef.lastChild.innerText = problem.children[0].value + ".";
        }
        divRef.lastChild.className = "baseOutputLabel";
        divRef.append(document.createElement("div"));
        divRef.lastChild.append(fragmentMap.get(problem.id).cloneNode(true));
        divRef.lastChild.className = "baseOutputContents";
    }
    document.getElementById("output").replaceChildren(temp);
}
