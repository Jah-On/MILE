import { 
    MLNameSpace, charMap, charRegex, leftOne,
    leftTwo, middlePlusOne, middlePlusTwo,
    operators
} from "./constants.js";
import { 
    exportToJSON, localDownloader, lastIndexOf,
    isAlpha
} from "./helper.js"
import { preProcess } from "./parser.js"
import { fragmentMap } from "./MILE_ui.js";
import { importToLocal } from "./js/project/util.js";

export function onTextInput(event) {
    let suggestion = document.getElementById("suggestion");
    if (suggestion) { suggestion.remove(); }

    let selected    = window.getSelection();
    let focusedNode = selected.focusNode;
    
    let range  = selected.getRangeAt(0);
    let offset = range.startOffset;
    let last   = "";
    if (focusedNode.data) {
        last = focusedNode.data.slice(
            lastIndexOf(focusedNode.data, /[^aA-zZ]/, offset - 1 - !isAlpha(event.data)|0) + 1, 
            offset - !isAlpha(event.data)|0
        );
    }

    if (!isAlpha(event.data) && charMap.has(last)) {
        selected.focusNode.replaceData(
            offset - last.length - 1,
            last.length,
            charMap.get(last)
        );
        range.setStart(selected.focusNode, offset - last.length + 1);
    }

    updateOutput();

    if ((last.length < 1) || !isAlpha(event.data)) {
        return;
    }
    for (const key of charMap.keys()) {
        if (!key.startsWith(last)) {
            continue;
        }
        suggestion = document.createElement("span");
        suggestion.id = "suggestion";
        suggestion.innerText = key.slice(last.length);
        suggestion.contentEditable = false;
        suggestion.tabIndex = 0;
        suggestion.addEventListener("focus", suggestionFocus);
    
        event.target.append(suggestion);
        event.target.insertBefore(suggestion, focusedNode.splitText(offset));

        break;
    }
}

function suggestionFocus(event) {
    let parent = event.target.parentNode;
    let selected = window.getSelection();
    if (!selected.focusNode.data) {
        return;
    }
    let range   = selected.getRangeAt(0);
    let matchIndex = lastIndexOf(selected.focusNode.data, /[^aA-zZ]/) + 1;
    let match   = selected.focusNode.data.substr(matchIndex) + event.target.innerText;
    let newChar = charMap.get(match);
    event.target.remove();
    selected.focusNode.replaceData(
        matchIndex,
        match.length, 
        newChar
    );
    if (newChar.length == 2) {
        range.setStart(selected.focusNode, matchIndex + 1);
    } else {
        selected.collapse(selected.focusNode, matchIndex + newChar.length);
    }
    parent.focus();

    updateOutput();
}

export function updateOutput(){
    let inputArea = document.getElementById("inputArea");
    fragmentMap.get(
        inputArea.getAttribute("uuid")
    ).replaceChildren();
    for (const element of preProcess(inputArea.innerText)) {
        fragmentMap.get(
            inputArea.getAttribute("uuid")
        ).append(document.createElementNS(MLNameSpace, "math"));
        fragmentMap.get(
            inputArea.getAttribute("uuid")
        ).lastChild.append(element);
        fragmentMap.get(
            inputArea.getAttribute("uuid")
        ).append(document.createElement("br"));
    }

    document.getElementById("output").replaceChildren(
        fragmentMap.get(
            inputArea.getAttribute("uuid")
        ).cloneNode(true)
    );
}

export function pageSave(event) {
    if ((event.key != "S") || !event.ctrlKey){
    }
    event.preventDefault();
    for (const inputElement of document.getElementsByClassName("input")) {
        inputElement.setAttribute("src", inputElement.value);
    }
    localDownloader(
        document.getElementById("documentName").getAttribute("name") + ".html",
        document.documentElement.outerHTML,
        "text/html"
    );
}

export function exportMIL(){
    let name = document.getElementById("project").getAttribute("data-name");
    localDownloader(
        name + ".mil",
        exportToJSON(),
        "text/plain"
    );
}

export function importMIL(){
    let fileElement = document.createElement("input");
    fileElement.id = "invisibleFileElement";
    fileElement.type = "file";
    fileElement.addEventListener("input", handleMILFile);
    fileElement.click();
}

function handleMILFile(event){
    let fileIOHandle = new FileReader;
    if (event.target.files[0].name.slice(-4) != ".mil") {
        window.alert("Invalid file type.");
        return;
    }
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", (e) => {
        importToLocal(e, event.target.files[0].name.slice(0, -4));
    });
}

export function windowLeave(event) {
    return event.preventDefault();
}
