import { MLNameSpace } from "./constants.js"
import { addProblem, updateBaseOutput } from "./MILE_ui.js"
import { preProccess } from "./parser.js"
import { fragmentMap } from "./MILE_ui.js"

// ChatGPT implementation
// Returns boolean
export function isAlpha(char) {
    return /^[a-zA-Z]+$/.test(char);
}

// ChatGPT implementation
// Returns boolean
export function isNumber(char) {
    return /^[0-9]+$/.test(char);
}

export function isUTF_8(char) {
    return (char.charCodeAt(0) > 127);
}

export function generateDisplayName(currentName){
    if (!currentName){ return ""; }
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    if (/.*[a-y]/.test(currentName)){
        return currentName.slice(0, -1) + alphabet[alphabet.indexOf(currentName.slice(-1)) + 1];
    } else {
        return currentName + "a";
    }
}

export function exportToJSON(){
    let outputData = [];
    let problems = [...document.getElementsByClassName("problemListRow")];
    problems = problems.slice(1, problems.length);
    for (const problem of problems){
        outputData.push(
            {
                displayName: problem.children[0].value||"",
                MILSource:   problem.getAttribute("MIL"),
            }
        );
    }
    return JSON.stringify(outputData);
}

export function importFromJSON(event){ 
    let decodedJSON = JSON.parse(event.target.result);
    for (const importedInput of decodedJSON){
        addProblem(undefined, importedInput.displayName);
        let newRow = document.getElementById("problemList").lastChild;
        newRow.setAttribute("MIL", importedInput.MILSource);
        newRow.childNodes[0].value = importedInput.displayName;
        
        let fragment = fragmentMap.get(newRow.id);
        for (const element of preProccess(importedInput.MILSource)) {
            fragment.append(document.createElementNS(MLNameSpace, "math"));
            fragment.lastChild.className = "segment";
            fragment.lastChild.append(element);
            fragment.append(document.createElement("br"));
        }
    }
    updateBaseOutput();
}

export function localDownloader(stringName, stringData, stringMIME) {
    let downloadLink = document.createElement("a");
    downloadLink.download = stringName;
    let blobby = new Blob([stringData], {type:stringMIME});
    let downloadURL = window.URL.createObjectURL(blobby);
    downloadLink.href = downloadURL;
    downloadLink.click();
}
