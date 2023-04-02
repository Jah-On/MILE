import { MLNameSpace } from "./constants.js";
import { exportToJSON, localDownloader, importFromJSON } from "./helper.js"
import { preProccess } from "./parser.js"

export function inputElementTyping(event) {
    let outputElement = document.getElementById("output");
    outputElement.innerHTML = "";

    outputElement.append(document.createElement("div"));
    outputElement.lastChild.className = "baseOutputContents";

    for (const element of preProccess(event.srcElement.value)) {
        outputElement.lastChild.append(document.createElementNS(MLNameSpace, "math"));
        outputElement.lastChild.lastChild.className = "segment";
        outputElement.lastChild.lastChild.append(element);
        outputElement.lastChild.append(document.createElement("br"));
    }

    event.srcElement.setAttribute("data", outputElement.innerHTML);
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

export function printOutput() {
    window.print();
}

export function exportMIL(){
    localDownloader(
        document.getElementById("documentName").getAttribute("name") + ".mil",
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
    fileIOHandle.readAsText(event.srcElement.files[0]);
    fileIOHandle.addEventListener("loadend", importFromJSON);
}

export function windowLeave(event) {
    event.preventDefault();
    return "";
}
