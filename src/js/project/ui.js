import * as problem from "../problem/ui.js";

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
    let target = event.target;
    let parent = target.parentElement;

    const name = target.innerText.replace("\n", "");
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

    const oldName = parent.getAttribute("data-name");

    if (name == "") {
        return;
    } else if (name == oldName){
        return;
    } else if (window.localStorage.getItem(name) != null) {
        window.alert("Project name already exists.");
        return;
    }

    let saved = window.localStorage.getItem(oldName);
    window.localStorage.setItem(name, saved);
    window.localStorage.removeItem(oldName);
    parent.setAttribute("data-name", name);
}

function remove(event) {
    let temp   = event.target.parentElement;
    let parent = temp.parentElement;
    const name = parent.getAttribute("data-name");
    if (window.confirm(`Delete ${name}?`)) {
        window.localStorage.removeItem(name);
        parent.remove();
    }
}

function copy(event) {
    let temp = event.target.parentElement;
    let parent = temp.parentElement;
    
    const name = parent.getAttribute("data-name");
    const newName = `${name}(1)`;
    
    if (window.localStorage.getItem(newName) != null) {
        window.alert("Project already exists.");
        return;
    }

    let saved = window.localStorage.getItem(name);
    window.localStorage.setItem(newName, saved);

    fromTemplate(newName);
}

export function fromTemplate(name){
    let list     = document.getElementById("list");
    let template = document.getElementById("projectTemplate");
    let clonedElement = template.cloneNode(true);
    clonedElement.id = "";
    clonedElement.setAttribute("data-name", name);
    clonedElement.style.display = "flex";
    let firstChild = clonedElement.firstElementChild;
    firstChild.innerText = name;
    firstChild.addEventListener(
        "keydown",
        rename
    );
    for (let i = 0; i < eventFunctions.length; i += 1) {
        clonedElement.children[1].children[i].addEventListener(
            "click",
            eventFunctions[i]
        );
    }
    list.append(clonedElement);
}

function edit(event) {
    let projects  = document.getElementById("projects");
    let project   = document.getElementById("project");
    let target    = event.target;
    let temp      = target.parentElement;
    let parent    = temp.parentElement;
    const name    = parent.getAttribute("data-name");

    projects.style.display = "none";

    project.style.display  = "flex";
    project.setAttribute("data-name", name);

    problem.loadAll(window.localStorage.getItem(name));
}

export function loadAll(){
    for (let i = 0; i < window.localStorage.length; i += 1) {
        let name = window.localStorage.key(i);
        fromTemplate(name);
    }
}