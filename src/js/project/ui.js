import { importFromJSON } from "../../helper";

const eventFunctions = [
    edit, remove, copy
]

export function add(){
    let name = window.prompt("Enter project name:");
    switch (name) {
        case null:
            return;
        case "":
            name = "Untitled";
            break;
    }
    if (window.localStorage.getItem(name) != null) {
        window.alert("Project already exists.");
        return;
    }
    fromTemplate(name);
    window.localStorage.setItem(name, "");
}

function rename(event) {
    const name = event.target.innerText.replace("\n", "");
    switch (event.key) {
        case "Enter":
            event.preventDefault();
            event.stopPropagation();
            break;
        case "Delete":
        case "Backspace":
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            return;
        default:
            if (name.length == 30) {
                event.preventDefault();
            }
            return;
    }

    const oldName = event.target.parentNode.getAttribute("data-name");

    if (name == "") {
        return;
    } else if (name == oldName){
        return;
    } else if (window.localStorage.getItem(name) != null) {
        window.alert("Project name already exists.");
        return;
    }

    window.localStorage.setItem(
        name,
        window.localStorage.getItem(oldName)
    );
    window.localStorage.removeItem(oldName);
    event.target.parentNode.setAttribute("data-name", name);
}

function remove(event) {
    const name = event.target.parentNode.parentNode.getAttribute("data-name");
    if (window.confirm(`Delete ${name}?`)) {
        window.localStorage.removeItem(name);
        event.target.parentNode.parentNode.remove();
    }
}

function copy(event) {
    const name = event.target.parentNode.parentNode.getAttribute("data-name");
    const newName = `${name}(1)`;
    
    if (window.localStorage.getItem(newName) != null) {
        window.alert("Project already exists.");
        return;
    }

    window.localStorage.setItem(
        newName,
        window.localStorage.getItem(name)
    );

    fromTemplate(newName);
}

export function fromTemplate(name){
    let clonedElement = document.getElementById("projectTemplate").cloneNode(true);
    clonedElement.id = "";
    clonedElement.setAttribute("data-name", name);
    clonedElement.style.display = "flex";
    clonedElement.children[0].innerText = name;
    clonedElement.children[0].addEventListener(
        "keydown",
        rename
    );
    for (let i = 0; i < eventFunctions.length; i += 1) {
        clonedElement.children[1].children[i].addEventListener(
            "click",
            eventFunctions[i]
        );
    }
    document.getElementById("list").append(clonedElement);
}

function edit(event) {
    const name = event.target.parentNode.parentNode.getAttribute("data-name");
    document.getElementById("projects").style.display = "none";

    let workspace = document.getElementById("project");
    workspace.style.display = "flex";
    workspace.setAttribute("data-name", name);

    importFromJSON(window.localStorage.getItem(name));
}

export function loadAll(){
    for (let i = 0; i < window.localStorage.length; i += 1) {
        fromTemplate(window.localStorage.key(i));
    }
}