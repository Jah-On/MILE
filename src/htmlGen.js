import {FUNCTION, singleChar, leftOneChar, operators,
    middlePlusOneChar, MLNameSpace
} from "./constants.js"
import {
    processLeftFunction, processMiddleFunction
} from "./processors.js"

// ChatGPT aided
// Returns element
export function functionToHTML(funcName, argElements) {
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
    let outputElement = document.createElementNS(MLNameSpace, "mrow");
    outputElement.setAttribute("displaystyle", "true");
    if (funcName == "abs") {
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode("|"));
        outputElement.append(argElements[0]);
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode("|"));
        return outputElement;
    }
    if (funcName == "evalint") {
        outputElement.append(document.createElementNS(MLNameSpace, "msubsup"));
        outputElement.lastChild.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.lastChild.setAttribute("largeop", "true");
        outputElement.lastChild.lastChild.append(document.createTextNode("|"));
        outputElement.lastChild.append(argElements[1], argElements[0]);
        return outputElement;
    }
    if (funcName == "frac") {
        outputElement.append(document.createElementNS(MLNameSpace, "mfrac"));
        outputElement.lastChild.append(argElements[0], argElements[1]);
        return outputElement;
    }
    if (funcName == "logbase") {
        outputElement.append(document.createElementNS(MLNameSpace, "msub"));
        outputElement.lastChild.append(document.createElementNS(MLNameSpace, "mtext"));
        outputElement.lastChild.lastChild.append(document.createTextNode("log"));
        outputElement.lastChild.append(argElements[0]);
        outputElement.append(argElements[1]);
        return outputElement;
    }
    if (funcName == "over") {
        outputElement.append(document.createElementNS(MLNameSpace, "mfrac"));
        outputElement.lastChild.append(argElements[0], argElements[1]);
        return outputElement;
    }
    if (funcName == "pow") {
        outputElement.append(document.createElementNS(MLNameSpace, "msup"));
        outputElement.lastChild.append(argElements[0], argElements[1]);
        return outputElement;
    }
    if (funcName == "sub") {
        outputElement.append(document.createElementNS(MLNameSpace, "msub"));
        outputElement.lastChild.append(argElements[0], argElements[1]);
        return outputElement;
    }
    if (funcName == "supsub") {
        outputElement.append(document.createElementNS(MLNameSpace, "msubsup"));
        outputElement.lastChild.append(argElements[0], argElements[2], argElements[1]);
        return outputElement;
    }
    if (funcName == "sqrt") {
        outputElement.append(document.createElementNS(MLNameSpace, "msqrt"));
        outputElement.lastChild.append(argElements[0]);
        return outputElement;
    }
    if (leftOneChar.hasOwnProperty(funcName)) {
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode(leftOneChar[funcName]));
        outputElement.append(argElements[0]);
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName)) {
        outputElement.append(document.createElement("mo"));
        outputElement.lastChild.setAttribute("largeop", "true");
        outputElement.lastChild.append(document.createTextNode(operators[funcName]));
        outputElement.append(argElements[0]);
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName.slice(0, -1))) {
        if (funcName.slice(-1) == "o") {
            outputElement.append(document.createElementNS(MLNameSpace, "mover"));

            outputElement.lastChild.append(document.createElementNS(MLNameSpace, "mo"));
            outputElement.lastChild.setAttribute("largeop", "true");
            outputElement.lastChild.lastChild.append(document.createTextNode(operators[funcName.substr(0, funcName.length - 1)]));

            outputElement.lastChild.append(argElements[0]);

            outputElement.append(argElements[1]);

            return outputElement;
        }
        if (funcName.slice(-1) == "u") {
            outputElement.append(document.createElementNS(MLNameSpace, "munder"));

            outputElement.lastChild.append(document.createElementNS(MLNameSpace, "mo"));
            outputElement.lastChild.setAttribute("largeop", "true");
            outputElement.lastChild.lastChild.append(document.createTextNode(operators[funcName.substr(0, funcName.length - 1)]));

            outputElement.lastChild.append(argElements[0]);

            outputElement.append(argElements[1]);

            return outputElement;
        }
        if (funcName.slice(-1) == "b") {
            outputElement.append(document.createElementNS(MLNameSpace, "munderover"));

            outputElement.lastChild.append(document.createElementNS(MLNameSpace, "mo"));
            outputElement.lastChild.setAttribute("largeop", "true");
            outputElement.lastChild.lastChild.append(document.createTextNode(operators[funcName.substr(0, funcName.length - 1)]));

            outputElement.lastChild.append(argElements[1]);

            outputElement.lastChild.append(argElements[0]);

            outputElement.append(argElements[2]);

            return outputElement;
        }
    }
    if (middlePlusOneChar.hasOwnProperty(funcName)) {
        outputElement.append(argElements[0]);
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode(middlePlusOneChar[funcName]));
        outputElement.append(argElements[1]);
        return outputElement;
    }

    return outputElement;
}

// Returns element
export function link(tokens) {
    for (let index = tokens.length - 1; index >= 0; --index) {
        let type = tokens[index][0];
        switch (type) {
            case FUNCTION:
                if (tokens[index][2] == 0) {
                    tokens[index][1] = processLeftFunction(tokens[index], tokens.slice(index + 1, index + 1 + tokens[index][3]))
                    tokens.splice(index + 1, Math.min(tokens.length - index, tokens[index][3]));
                } else {
                    tokens[index][1] = processMiddleFunction(tokens[index], tokens.slice(index - 1, index), tokens.slice(index + 1, index + 1 + tokens[index][3]));
                    tokens.splice(index + 1, Math.min(tokens.length - index, tokens[index][3]));
                    if (index != 0) {
                        tokens.splice(index - 1, 1);
                    }
                    --index;
                }
                break;
            default:
                break;
        }
    }

    let outputElement = document.createElementNS(MLNameSpace, "mrow");
    for (const token of tokens) {
        outputElement.append(token[1]);
    }

    return outputElement;
}
