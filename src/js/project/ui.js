import * as problem from "../problem/ui.js";
import * as storage from "../storage/util.js";

const eventFunctions = [
    edit, remove, copy, showRevisions
]

export function add(){
    let id = storage.create("");
    fromTemplate(id, "");
}

function rename(event) {
    let target = event.target;
    let parent = target.parentElement;

    storage.rename(parent.id, target.value);
}

function remove(event) {
    let temp   = event.target.parentElement;
    let parent = temp.parentElement;
    const name = storage.getName(parent.id);
    if (window.confirm(`Delete ${name}?`)) {
        storage.remove(parent.id);
        parent.remove();
    }
}

function copy(event) {
    let temp   = event.target.parentElement;
    let parent = temp.parentElement;
    
    const id      = parent.id;
    const newName = `${storage.getName(id)}(1)`;

    fromTemplate(storage.copy(id, newName), newName);
}

function showRevisions(event) {
    let   temp   = event.target.parentElement;
    let   parent = temp.parentElement;
    let   dialog = document.getElementById("revisions");
    let   list   = document.getElementById("revisionList");
    const id     = parent.id;

    dialog.showModal();

    let   timestamps = storage.getCommits(id);
    for (const timestamp of timestamps) {
        list.append(document.createElement("input"));
        list.lastElementChild.id    = id;
        list.lastElementChild.type  = "button";
        list.lastElementChild.value = new Date(timestamp).toLocaleString();
        list.lastElementChild.addEventListener(
            "click",
            revisionClick
        );
    }
}

function revisionClick(event) {
    if (!window.confirm("Are you sure you want to revert to this revision?")) {
        return;
    }
    let   target = event.target;
    let   parent = target.parentElement;
    const id     = target.id;
    
    storage.rebaseTo(id, [...parent.children].indexOf(target));

    closeRevisions();
}

export function closeRevisions() {
    let dialog = document.getElementById("revisions");

    let list = document.getElementById("revisionList");
    list.replaceChildren();

    dialog.close();
}


export function fromTemplate(id, name){
    let list     = document.getElementById("list");
    let template = document.getElementById("projectTemplate");
    let clonedElement = template.content.cloneNode(true).children[0];
    clonedElement.id = id;
    clonedElement.style.display = "flex";
    let firstChild = clonedElement.firstElementChild;
    firstChild.innerText = name;
    firstChild.addEventListener(
        "focusout",
        rename
    );
    for (let i = 0; i < eventFunctions.length; i += 1) {
        clonedElement.children[1].children[i].addEventListener(
            "click",
            eventFunctions[i]
        );
    }
    list.append(clonedElement);
    if (name == "") {
        clonedElement.children[0].focus();
    }
}

function edit(event) {
    let projects  = document.getElementById("projects");
    let project   = document.getElementById("project");
    let target    = event.target;
    let temp      = target.parentElement;
    let parent    = temp.parentElement;
    const id      = parent.id;

    projects.style.display = "none";

    project.style.display  = "flex";
    project.setAttribute("data-id", id);

    problem.loadAll(storage.load(id));
}

export function loadAll() {    
    document.getElementById("list").replaceChildren(
        document.getElementById("addProject")
    );

    for (const id of storage.getIDsByLastSave()) {
        fromTemplate(id, storage.getName(id));
    }
}