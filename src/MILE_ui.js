import { MLNameSpace } from "./constants.js";
import { generateDisplayName } from "./helper.js";
import { updateOutput } from "./events.js";

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
    if (rowElement.nextSibling != document.getElementById("addNew")) {
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
    let sideBar = document.getElementById("sideBar");
    sideBar.children[0].style.display = "none";
    sideBar.children[1].style.display = "none";
    sideBar.children[2].style.display = "flex";
    document.getElementById("problemList").style.display = "none";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "block";
    inputArea.focus();
    inputArea.setAttribute("UUID", event.target.parentNode.id);
    let src = event.target.parentNode.getAttribute("src") || "";
    inputArea.replaceChildren();
    for (const line of src.split("\n")) {
        if (line == "") {
            inputArea.append(document.createElement("br"));
            continue;
        }
        inputArea.append(document.createTextNode(line));
        inputArea.append(document.createElement("br"));
    }
    updateOutput();
}

export function backToBase(event) {
    let srcString = "";
    let input = document.getElementById("inputArea");
    let nodes = input.childNodes;
    let stop  = nodes.length - (nodes[nodes.length - 1].nodeName == "BR")|0;
    for (let i = 0; i < stop; i+=1) {
        if (nodes[i].nodeName == "BR") {
            srcString += "\n";
            continue;
        }
        srcString += nodes[i].data.replace("\t", ""); 
    }
    let sideBar = document.getElementById("sideBar");
    sideBar.children[0].style.display = "flex";
    sideBar.children[1].style.display = "flex";
    sideBar.children[2].style.display = "none";
    document.getElementById("problemList").style.display = "block";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "none";
    document.getElementById(
        inputArea.getAttribute("UUID")
    ).setAttribute("src", srcString);
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

export function addProblem(displayName) {
    let UUID         = crypto.randomUUID();
    fragmentMap.set(UUID, document.createDocumentFragment());
    let problemList  = document.getElementById("problemList");
    let addNewButton = document.getElementById("addNew");
    problemList.append(newProblemRow(UUID, displayName));
    problemList.insertBefore(problemList.lastChild, addNewButton);
    addNewButton.scrollIntoView();
    problemList.children[problemList.children.length - 2].children[0].focus();
    updateBaseOutput();
}

export function updateBaseOutput() {
    let temp = document.createDocumentFragment();

    let problems = [...document.getElementById("problemList").children];
    problems = problems.slice(1, problems.length-1);
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
