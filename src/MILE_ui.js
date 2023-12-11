import { exportToJSON, generateDisplayName } from "./helper.js";
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
    if (!window.confirm(`Are you sure you want to delete this problem?`)) {
        return;
    }
    event.target.parentNode.remove();
    fragmentMap.delete(event.target.parentNode.id);
    updateBaseOutput();
}

export function editInput(event) {
    let backButton = document.getElementById("backButton");
    backButton.removeEventListener("click", backToHome);
    backButton.addEventListener("click", backToBase);
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
    let backButton = document.getElementById("backButton");
    backButton.removeEventListener("click", backToBase);
    backButton.addEventListener("click", backToHome);
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

    for (const UUID of fragmentMap.keys()) {
        temp.append(document.createElement("div"));
        let divRef = temp.lastChild;
        divRef.className = "baseOutput";
        divRef.append(document.createElement("span"));
        const name = document.getElementById(UUID).children[0].value;
        if (name) {
            divRef.lastChild.innerText = name + ".";
        }
        divRef.lastChild.className = "baseOutputLabel";
        divRef.append(document.createElement("div"));
        divRef.lastChild.append(fragmentMap.get(UUID).cloneNode(true));
        divRef.lastChild.className = "baseOutputContents";
    }
    document.getElementById("output").replaceChildren(temp);

    let projectName = document.getElementById("project").getAttribute("data-name");

    window.localStorage.setItem(projectName, exportToJSON());
}

export function backToHome(){
    for (const UUID of fragmentMap.keys()) {
        document.getElementById(UUID).remove();
    }
    fragmentMap.clear();
    document.getElementById("projects").style.display = "flex";
    document.getElementById("project").style.display = "none";
}