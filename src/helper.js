import { MLNameSpace } from "./constants.js"
import { addProblem, updateBaseOutput } from "./MILE_ui.js"
import { preProccess } from "./parser.js"
import { fragmentMap } from "./MILE_ui.js"

// ChatGPT implementation
// Returns boolean
export function isAlpha(char = "") {
    return /^[a-zA-Z]+$/.test(char);
}

// ChatGPT implementation
// Returns boolean
export function isNumber(char = "") {
    return /^[0-9]+$/.test(char);
}

export function isUTF_8(char = "") {
    return (char.charCodeAt(0) > 127);
}

export function generateDisplayName(current=""){
    if (!current){ return ""; }
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    if (/.*[a-y]/.test(current)){
        return current.slice(0, -1) + alphabet[alphabet.indexOf(current.slice(-1)) + 1];
    } else {
        return current + "a";
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
                src:   problem.getAttribute("src"),
            }
        );
    }
    return JSON.stringify(outputData);
}

export function importFromJSON(event = new ProgressEvent()){ 
    let decodedJSON = JSON.parse(event.target.result);
    for (const importedInput of decodedJSON){
        addProblem(undefined, importedInput.displayName);
        let newRow = document.getElementById("problemList").lastChild;
        newRow.setAttribute("src", importedInput.src);
        newRow.childNodes[0].value = importedInput.displayName;
        
        let fragment = fragmentMap.get(newRow.id);
        for (const element of preProccess(importedInput.src)) {
            fragment.append(document.createElementNS(MLNameSpace, "math"));
            fragment.lastChild.append(element);
            fragment.append(document.createElement("br"));
        }
    }
    updateBaseOutput();
}

export function localDownloader(name="", data="", MIME="") {
    let downloadLink = document.createElement("a");
    downloadLink.download = name;
    let blobby = new Blob([data], {type:MIME});
    let downloadURL = window.URL.createObjectURL(blobby);
    downloadLink.href = downloadURL;
    downloadLink.click();
}

export function lastIndexOf(string="", regex= new RegExp(), startIndex = -1, notFound = -1){
    let lastIndex = notFound;
    if (startIndex == -1){
        startIndex = string.length - 1;
    }
    for (let i = startIndex; i >= 0; i-=1){
        if (regex.test(string[i])){
            lastIndex = i;
            break;
        }
    }
    return lastIndex;
}