import { MLNameSpace, charMap, charRegex,
} from "./constants.js";
import { 
    exportToJSON, localDownloader, importFromJSON,
    lasrIndexOf
} from "./helper.js"
import { preProccess } from "./parser.js"
import { fragmentMap } from "./MILE_ui.js";


export function onTextInput(event) {
    let suggestion = document.getElementById("suggestion");
    if (suggestion) {
        suggestion.remove();
    }

    fragmentMap.get(
        event.target.getAttribute("uuid")
    ).replaceChildren(
        preProccess(event.target.innerText)
    );

    document.getElementById("output").replaceChildren(
        fragmentMap.get(
            event.target.getAttribute("uuid")
        ).cloneNode(true)
    );

    let selected = window.getSelection();
    if (!selected.focusNode.data) {
        return;
    }
    let range  = selected.getRangeAt(0);
    let offset = range.startOffset;
    let cursorSplit = [selected.focusNode.data.slice(0, offset), selected.focusNode.data.slice(offset)];
    let last = cursorSplit[0].split(/[^aA-zZ]/).slice(-1)[0];
    if (last.length < 1) {
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
        event.target.insertBefore(suggestion, selected.focusNode.splitText(offset));

        break;
    }
}

function suggestionFocus(event) {
    let parent = event.target.parentNode;
    let prev   = event.target.previousSibling;
    let selected = window.getSelection();
    if (!selected.focusNode.data) {
        return;
    }
    let range  = selected.getRangeAt(0);
    let offset = range.startOffset;
    let matchIndex = lasrIndexOf(selected.focusNode.data, /[^aA-zZ]/) + 1;
    let match = selected.focusNode.data.substr(matchIndex) + event.target.innerText;
    event.target.remove();
    selected.focusNode.replaceData(
        matchIndex,
        match.length, 
        charMap.get(match)
    );
    selected.collapse(selected.focusNode, matchIndex + charMap.get(match).length);
    parent.focus();
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
    localDownloader(
        document.body.getAttribute("name") + ".mil",
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
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", importFromJSON);
}

export function windowLeave(event) {
    event.preventDefault();
    return "";
}
