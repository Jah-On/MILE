import {singleChar, leftOneChar, operators, 
        middleTwoChar, MLNameSpace} from "./constants.js"
import {generateRand16} from "./helper.js"
import {processGroup, processLeftFunction, processMiddleFunction, processSub
        } from "./processors.js" 

// ChatGPT aided
// Returns element
export function functionToHTML(funcName, argElements){
    funcName = funcName.replace("^", "pow")
                       .replace("'", "prime")
                       .replace("-", "minus")
                       .replace("+", "plus")
                       .replace("|", "divides")
                       .replace("=", "equals")
                       .replace(">", "gthan")
                       .replace("<", "lthan")
                       .replace("*", "times")
    let ID = "";
    let outputElement = document.createElementNS(MLNameSpace, "math");
    if (funcName == "abs"){
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.innerText = "|";
        outputElement.append(argElements[0]);
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.innerText = "|";
        return outputElement;
    }
    if (funcName == "frac"){
        outputElement.append(document.createElementNS(MLNameSpace, "mfrac"));
        outputElement.lastChild.append(argElements[0]);
        outputElement.lastChild.append(argElements[1]);
        return outputElement;
    }
    if (funcName == "logbase"){
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.innerText = "log";
        outputElement.append(argElements[0]);
        outputElement.lastChild.className = funcName;
        outputElement.append(argElements[1]);
        return outputElement;
    }
    if (funcName == "pow"){
        outputElement.append(argElements[0]);
        outputElement.append(argElements[1]);
        outputElement.lastChild.className = funcName;
        return outputElement;
    }
    if (funcName == "sqrt"){
        outputElement.append(document.createElementNS(MLNameSpace, "msqrt"));
        outputElement.lastChild.append(argElements[0]);
        return outputElement;
    }
    if (singleChar.hasOwnProperty(funcName)){
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.className = funcName;
        outputElement.lastChild.innerText = singleChar[funcName];
        return outputElement;
    }
    if (leftOneChar.hasOwnProperty(funcName)){
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.className = funcName;
        outputElement.lastChild.innerText = leftOneChar[funcName];
        outputElement.append(argElements[0]);
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName)){
        ID = generateRand16();
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.ID = ID;
        outputElement.lastChild.className = funcName;
        outputElement.lastChild.innerText = operators[funcName];
        outputElement.append(argElements[0]);
        outputElement.lastChild.className = "operationInput";
        outputElement.lastChild.setAttribute("data", ID);
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName.slice(0, -1))){
        ID = generateRand16();
        if (funcName.slice(-1) == "o"){
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "over";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = operators[funcName.substr(0, funcName.length - 1)];

            outputElement.append(argElements[1]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;
        }
        if (funcName.slice(-1) == "u"){
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = operators[funcName.substr(0, funcName.length - 1)];

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "under";

            outputElement.append(argElements[1]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;
        }
        if (funcName.slice(-1) == "b"){
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "over";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = operators[funcName.substr(0, funcName.length - 1)];

            outputElement.lastChild.append(argElements[1]);
            outputElement.lastChild.lastChild.className = "under";

            outputElement.append(argElements[2]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;
        }
    }
    if (middleTwoChar.hasOwnProperty(funcName)){
        outputElement.append(argElements[0]);
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.className = funcName;
        outputElement.lastChild.innerText = middleTwoChar[funcName];
        outputElement.append(argElements[1]);
        return outputElement;
    }
    
    return outputElement;
}

// Returns element
export function link(tokens){
    for (let index = tokens.length - 1; index >= 0; --index){
        if (tokens[index][0] == 0){
            if (tokens[index][2] == 0){
                tokens[index][1] = processLeftFunction(tokens[index], tokens.slice(index + 1, index + 1 + tokens[index][3]))
                tokens.splice(index + 1, Math.min(tokens.length - index, tokens[index][3]));
            } else {
                tokens[index][1] = processMiddleFunction(tokens[index], tokens.slice(index - 1, index), tokens.slice(index + 1, index + 2));
                tokens.splice(index + 1, 1);
                if (index != 0){
                    tokens.splice(index - 1, 1);
                }
                --index;
            }
        } else if (tokens[index][0] == 1){
            tokens[index][1] = processSub(tokens[index]);
        } else {
            tokens[index][1] = processGroup(tokens[index]);
        }
    }

    let outputElement = document.createElement("span");
    for (let index = 0; index < tokens.length; ++index){
        outputElement.append(tokens[index][1]);
        if (index + 1 == tokens.length){
            continue;
        }
        if ((tokens[index][0] == tokens[index + 1][0]) && (tokens[index][0] == 2)){
            outputElement.innerText += " ";
        }
    }

    return outputElement;
}
