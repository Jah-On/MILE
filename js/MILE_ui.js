import {onEvent} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/events.js"
import {generateID} from "https://raw.githubusercontent.com/Jah-On/MILE/main/js/helper.js"

export function updateName(event){
    let newID = generateID(event.srcElement.value);
    document.getElementById(event.srcElement.getAttribute("data")).setAttribute("showID", String(newID[1]));
    document.getElementById(event.srcElement.getAttribute("data")).id = newID[0];
    for (let index = 0; index < event.srcElement.parentNode.childNodes.length; ++index) {
        event.srcElement.parentNode.childNodes[index].setAttribute("data", newID[0]);
    };
    updateBaseOutput();
}

export function moveInputUp(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let previousElement = event.srcElement.parentNode.previousSibling;
    if (previousElement){
        event.srcElement.parentNode.parentNode.insertBefore(event.srcElement.parentNode, previousElement);
        inputElement.parentNode.insertBefore(inputElement, inputElement.previousSibling);
    }
    updateBaseOutput();
}

export function moveInputDown(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let nextElement = event.srcElement.parentNode.nextSibling;
    if (nextElement){
        event.srcElement.parentNode.parentNode.insertBefore(nextElement, event.srcElement.parentNode);
        inputElement.parentNode.insertBefore(inputElement.nextSibling, inputElement);
    }
    updateBaseOutput();
}

export function copyInput(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let newID = generateID(event.srcElement.getAttribute("data"));
    inputElement.insertAdjacentElement("afterend", newInputElement(newID[0], newID[1]));
    document.getElementById(newID[0]).setAttribute("data", inputElement.getAttribute("data"));
    document.getElementById(newID[0]).value = inputElement.value;
    document.getElementById(newID[0]).setAttribute("showID", inputElement.getAttribute("showID"));
    event.srcElement.parentNode.insertAdjacentElement("afterend", newProblemTableRow(newID[0], inputElement.getAttribute("showID") == "true"));
    document.getElementById("problemList").lastChild.scrollIntoView();
    updateBaseOutput();
}

export function deleteInput(event){
    event.srcElement.parentNode.remove();
    document.getElementById(event.srcElement.getAttribute("data")).remove();
    updateBaseOutput();
}

export function editInput(event){
    document.getElementById("baseForm").hidden = true;
    document.getElementById("problemList").hidden = true;
    document.getElementById("backToBase").hidden = false;
    document.getElementById("backToBase").setAttribute("data", event.srcElement.getAttribute("data"));
    document.getElementById(event.srcElement.getAttribute("data")).hidden = false;
    document.getElementById(event.srcElement.getAttribute("data")).focus();
    document.getElementById("output").innerHTML = document.getElementById(event.srcElement.getAttribute("data")).getAttribute("data");
}

export function backToBase(event){
    document.getElementById("baseForm").hidden = false;
    document.getElementById("problemList").hidden = false;
    document.getElementById("backToBase").hidden = true;
    document.getElementById(event.srcElement.getAttribute("data")).hidden = true;
    updateBaseOutput();
}

export function newInputElement(id, showID){
    let newInput = document.createElement("textarea");
    newInput.className = "input";
    newInput.id = id;
    newInput.addEventListener("input", function(){onEvent(this);});
    newInput.setAttribute("data", "");
    newInput.setAttribute("showID", String(showID));
    newInput.hidden = true;
    return newInput;
}

export function newProblemTableRow(inputID, visibleID){
    let rowDiv = document.createElement("div");
    rowDiv.className = "problemListRow"
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "problemName";
    if (visibleID){
        nameInput.value = inputID;
    }
    nameInput.setAttribute("data", inputID);
    nameInput.addEventListener("input", updateName);
    let moveUp = document.createElement("button");
    moveUp.className = "editProblem";
    moveUp.textContent = "Move Up";
    moveUp.setAttribute("data", inputID);
    moveUp.addEventListener("click", moveInputUp);
    let moveDown = document.createElement("button");
    moveDown.className = "editProblem";
    moveDown.textContent = "Move Down";
    moveDown.setAttribute("data", inputID);
    moveDown.addEventListener("click", moveInputDown);
    let copy = document.createElement("button");
    copy.className = "editProblem";
    copy.textContent = "Copy";
    copy.setAttribute("data", inputID);
    copy.addEventListener("click", copyInput);
    let remove = document.createElement("button");
    remove.className = "editProblem";
    remove.textContent = "Delete";
    remove.setAttribute("data", inputID);
    remove.addEventListener("click", deleteInput);
    let edit = document.createElement("button");
    edit.className = "editProblem";
    edit.textContent = "Edit";
    edit.setAttribute("data", inputID);
    edit.addEventListener("click", editInput);

    rowDiv.append(nameInput, moveUp, moveDown, copy, remove, edit);

    return rowDiv;
}

export function addNewInput(){
    let problemNameInput = document.getElementById("baseForm").children[0];
    let problemList = document.getElementById("problemList");
    let ID = generateID(problemNameInput.value);
    document.getElementById("inputs").append(newInputElement(ID[0], ID[1]));
    problemList.append(newProblemTableRow(ID[0], ID[1]));
    problemNameInput.value = "";
    problemList.lastChild.scrollIntoView();
    updateBaseOutput();
}

export function updateBaseOutput(){
    let outputElement = document.getElementById("output");
    outputElement.innerHTML = "";
    const inputElements = document.getElementsByClassName("input");
    for (let index = 0; index < inputElements.length; ++index){
        let problem = document.createElement("div");
        problem.className = "baseOutput";
        let label = document.createElement("span");
        if (inputElements[index].getAttribute("showID") == "true"){
            label.innerText = inputElements[index].id + ".";
        }
        label.className = "baseOutputLabel";
        let contents = document.createElement("div");
        contents.innerHTML = inputElements[index].getAttribute("data");
        contents.className = "baseOutputContents";
        problem.append(label, contents);
        outputElement.append(problem);
        if (index == inputElements.length - 1){
            contents.scrollIntoView();
        }
    }
}
