// import { exportToJSON } from "../../helper.js";
import { generateDisplayName } from "./util.js";
import * as storage from "../storage/util.js";
import * as output  from "../output/ui.js";

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

function move(node, direction) {
    let parent = node.parentElement;
    switch (direction) {
        case -1:
            parent.insertBefore(node.nextSibling||node, node);
            break;
        default:
            if (node == parent.firstElementChild) { break; }
            parent.insertBefore(node, node.previousSibling);
            break;
    }
    updateBaseOutput();
}

function moveDown(event) {
    let parent = event.target.parentElement;
    move(parent, -1);
}

function moveUp(event) {
    let parent = event.target.parentElement;
    move(parent, 1);    
}

function copy(event) {
    let parent = event.target.parentElement;
    let newUUID = crypto.randomUUID();
    fragmentMap.set(
        newUUID, 
        fragmentMap.get(parent.id).cloneNode(true)
    );
    let cloned               = parent.cloneNode(true);
    let firstChild           = cloned.firstElementChild;
    cloned.id                = newUUID;
    firstChild.value         = generateDisplayName(firstChild.value);
    addProblemListeners(cloned);
    parent.insertAdjacentElement("afterend", cloned);
    cloned.scrollIntoView();
    updateBaseOutput();
}

function remove(event) {
    let parent = event.target.parentElement;
    if (!window.confirm(`Are you sure you want to delete this problem?`)) {
        return;
    }
    parent.remove();
    fragmentMap.delete(parent.id);
    updateBaseOutput();
}

function edit(event) {
    setBackButton(backToList);
    let parent       = event.target.parentElement;
    let exportButton = document.getElementById("exportButton");
    let problems     = document.getElementById("problems");
    let inputArea    = document.getElementById("inputArea");

    exportButton.style.display = "none";
    problems.style.display     = "none";
    inputArea.style.display    = "block";

    inputArea.focus();
    inputArea.setAttribute("uuid", parent.id);

    inputArea.innerText = parent.data;

    output.renderProblem();
}

export function backToList() {
    let exportButton = document.getElementById("exportButton");
    let problems     = document.getElementById("problems");
    let input        = document.getElementById("inputArea");
    let project      = document.getElementById("project");

    let srcString = "";
    input.childNodes.forEach((node) => {
        srcString += node.textContent||"\n";
    });
    srcString = srcString.replace("\t", "");

    setBackButton(backToHome);
    exportButton.style.display = "block";
    problems.style.display     = "block";
    input.style.display        = "none";
    
    let UUID = input.getAttribute("UUID");
    let row = document.getElementById(UUID);
    row.data = srcString;
    let projectID = project.getAttribute("data-id");
    storage.save(projectID);
    updateBaseOutput();
}

export function newProblemRow(UUID, displayName) {
    let rowTemplate         = document.getElementById("rowTemplate");
    let clone               = rowTemplate.content.firstElementChild.cloneNode(true);
    clone.id                = UUID;
    clone.children[0].value = displayName;

    addProblemListeners(clone);
    return clone;
}

export function add(displayName) {
    let UUID      = crypto.randomUUID();
    let problems  = document.getElementById("problems").firstElementChild;
    let newRow    = newProblemRow(UUID, displayName);
    newRow.data   = "\n";

    fragmentMap.set(UUID, document.createDocumentFragment());
    problems.append(newRow);
    newRow.children[0].focus();
    updateBaseOutput();
}

export function updateBaseOutput() {
    let output     = document.getElementById("output");
    let problems   = document.getElementById("problems");
    let firstChild = problems.firstElementChild;
    let temp = document.createDocumentFragment();

    for (const item of firstChild.children) {
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
    output.replaceChildren(temp);
}

export function backToHome(){
    let project  = document.getElementById("project");
    let projects = document.getElementById("projects");

    const id = project.getAttribute("data-id");
    storage.save(id);

    for (const UUID of fragmentMap.keys()) {
        let row = document.getElementById(UUID);
        row.remove();
    }
    fragmentMap.clear();
    project.style.display  = "none";
    projects.style.display = "flex";
}

function setBackButton(fn) {
    let backButton = document.getElementById("backButton");
    backButton.removeEventListener("click", backButtonMap.get(fn));
    backButton.addEventListener("click", fn);
}

export function loadAll(data) {
    let decodedJSON = JSON.parse(data);
    for (const importedInput of decodedJSON){
        const name = importedInput.name;
        const data = importedInput.data;
        add(name);
        let problems = document.getElementById("problems").firstElementChild;
        let newRow = problems.lastElementChild;
        newRow.data = data;
        newRow.children[0].value = name;
        
        output.render(newRow.id, data);
    }
    updateBaseOutput();
}