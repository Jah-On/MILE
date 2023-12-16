import { exportToJSON, generateDisplayName } from "../../helper.js";
import { updateOutput } from "../../events.js";

const functionArray = [updateBaseOutput, moveUp, moveDown, copy, remove, edit];
const eventArray =    ["input", "click", "click", "click", "click", "click"];

export let fragmentMap = new Map();

const backButtonMap = new Map([
    [backToList, backToHome],
    [backToHome, backToList]
]);

function addProblemListeners(problemRow) {
    for (let index = 0; index < eventArray.length; ++index) {
        problemRow.children[index].addEventListener(
            eventArray[index], functionArray[index]
        );
    }
}

function move(node = Node, direction) {
    switch (direction) {
        case -1:
            node.parentNode.insertBefore(node.nextSibling||node, node);
            break;
        default:
            if (node == node.parentNode.firstElementChild) { break; }
            node.parentNode.insertBefore(node, node.previousSibling);
            break;
    }
    updateBaseOutput();
}

function moveDown(event) {
    move(event.target.parentNode, -1);
}

function moveUp(event) {
    move(event.target.parentNode, 1);
}

function copy(event) {
    let newUUID = crypto.randomUUID();
    fragmentMap.set(
        newUUID, 
        fragmentMap.get(event.target.parentNode.id).cloneNode(true)
    );
    let cloned               = event.target.parentNode.cloneNode(true);
    cloned.id                = newUUID;
    cloned.children[0].value = generateDisplayName(cloned.children[0].value);
    addProblemListeners(cloned);
    event.target.parentNode.insertAdjacentElement("afterend", cloned);
    cloned.scrollIntoView();
    updateBaseOutput();
}

function remove(event) {
    if (!window.confirm(`Are you sure you want to delete this problem?`)) {
        return;
    }
    event.target.parentNode.remove();
    fragmentMap.delete(event.target.parentNode.id);
    updateBaseOutput();
}

function edit(event) {
    setBackButton(backToList);
    document.getElementById("exportButton").style.display = "none";
    document.getElementById("problems").style.display = "none";
    let inputArea = document.getElementById("inputArea");
    inputArea.style.display = "block";
    inputArea.focus();
    inputArea.setAttribute("UUID", event.target.parentNode.id);
    let src = event.target.parentNode.getAttribute("src") || "";
    inputArea.replaceChildren();
    for (const line of src.split("\n")) {
        if (line != "") {
            inputArea.append(document.createTextNode(line));
        }
        inputArea.append(document.createElement("br"));
    }
    updateOutput();
}

export function backToList(event) {
    let input     = document.getElementById("inputArea");

    let nodes     = input.childNodes;
    let srcString = "";
    for (const node of nodes) {
        srcString += node.data||"\n";
    }
    srcString = srcString.replace("\t", "");

    setBackButton(backToHome);
    document.getElementById("exportButton").style.display = "block";
    document.getElementById("problems").style.display = "block";
    input.style.display = "none";
    document.getElementById(
        input.getAttribute("UUID")
    ).setAttribute("src", srcString);
    updateBaseOutput();
}

export function newProblemRow(UUID, displayName) {
    let clone               = document.getElementById("rowTemplate").content.children[0].cloneNode(true);
    clone.id                = UUID;
    clone.children[0].value = displayName;

    addProblemListeners(clone);
    return clone;
}

export function add(displayName) {
    let UUID      = crypto.randomUUID();
    let problems  = document.getElementById("problems").firstElementChild;
    let newRow    = newProblemRow(UUID, displayName);

    fragmentMap.set(UUID, document.createDocumentFragment());
    problems.append(newRow);
    newRow.children[0].focus();
    updateBaseOutput();
}

export function updateBaseOutput() {
    let temp = document.createDocumentFragment();

    for (const item of document.getElementById("problems").firstElementChild.children) {
        let UUID = item.id;
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

function setBackButton(fn) {
    let backButton = document.getElementById("backButton");
    backButton.removeEventListener("click", backButtonMap.get(fn));
    backButton.addEventListener("click", fn);
}