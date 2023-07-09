import { MLNameSpace } from "./constants.js";
import { exportToJSON, localDownloader, importFromJSON } from "./helper.js"
import { preProccess } from "./parser.js"
import { fragmentMap } from "./MILE_ui.js";

export function inputElementTyping(event) {
    let fragment = fragmentMap.get(event.target.getAttribute("UUID"));

    fragment.replaceChildren();

    for (const element of preProccess(event.target.innerText)) {
        fragment.append(document.createElementNS(MLNameSpace, "math"));
        fragment.lastChild.className = "segment";
        fragment.lastChild.append(element);
        fragment.append(document.createElement("br"));
    }

    let outputDiv = document.createElement("div");
    outputDiv.className = "baseOutputContents";
    outputDiv.append(fragment.cloneNode(true));
    document.getElementById("output").replaceChildren(
        outputDiv
    );
    document.getElementById(event.target.getAttribute("UUID")).setAttribute(
        "MIL", 
        event.target.innerText
    );
}

export function pageSave(event) {
    if ((event.keyCode == 83) && event.ctrlKey){
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
