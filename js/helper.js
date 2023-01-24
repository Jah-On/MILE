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