import { MLNameSpace } from "./constants.js"
import { addNewInput, updateBaseOutput } from "./MILE_ui.js"
import { preProccess } from "./parser.js"

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

export function generateRand16(){
    let returnString = "";
    for (let index = 0; index < 16; ++index){
        returnString = returnString + String.fromCharCode(
            Math.random() * 10 + 48
        );
    }
    return returnString;
}

export function generateID(IDString){
    if (IDString.length == 0){
        return [generateRand16(), false];
    }
    if (document.getElementById(IDString) == null){
        return [IDString, true];
    }
    let newID = IDString;
    while (document.getElementById(newID) != null){
        if (isAlpha(newID[newID.length - 1]) && (newID[newID.length - 1] != "z")){
            newID = newID.substring(0, newID.length - 1) + String.fromCharCode(newID[newID.length - 1].charCodeAt() + 1);
        } else {
            newID = newID + "a";
        }
    }
    return [newID, true];
}

export function exportToJSON(){
    let outputData = [];
    for (const inputElement of document.getElementsByClassName("input")){
        outputData.push(
            {
                id:        inputElement.id,
                visibleID: inputElement.getAttribute("showID"),
                src:       inputElement.value
            }
        );
    }
    return JSON.stringify(outputData);
}

export function importFromJSON(event){
    let decodedJSON = JSON.parse(event.srcElement.result);
    for (const importedInput of decodedJSON){
        let newInput = addNewInput(importedInput.id, importedInput.visibleID);
        newInput.value = importedInput.src;
        
        let container = document.createElement("div");
        container.className = "baseOutputContents";

        for (const element of preProccess(importedInput.src)) {
            container.append(document.createElementNS(MLNameSpace, "math"));
            container.lastChild.className = "segment";
            container.lastChild.append(element);
            container.append(document.createElement("br"));
        }
        newInput.setAttribute("data", newInput.getAttribute("data") + container.outerHTML);
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
