import { MLNameSpace } from "./constants.js";
import { isAlpha, isNumber } from "./helper.js"
import { functionToHTML, link } from "./htmlGen.js"
import { parse } from "./parser.js"

// Returns element
export function processLeftFunction(functionToken, tokensRight) {
    let accumulator = [];
    for (let index = 0; index < functionToken[3]; ++index) {
        if (index < tokensRight.length) {
            accumulator.push(tokensRight[index][1]);
        } else {
            accumulator.push(document.createElementNS(MLNameSpace, "mtext"));
            accumulator[accumulator.length - 1].append(document.createTextNode("¿"));
        }
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns element
export function processMiddleFunction(functionToken, tokenLeft, tokenRight) {
    let accumulator = [];
    if (tokenLeft.length > 0) {
        accumulator.push(link(parse(tokenLeft[0][1])));
    } else {
        accumulator.push(document.createElementNS(MLNameSpace, "mtext"));
        accumulator[accumulator.length - 1].append(document.createTextNode("¿"));
    }
    if (tokenRight.length > 0) {
        accumulator.push(tokenRight[0][1]);
    } else {
        accumulator.push(document.createElementNS(MLNameSpace, "mtext"));
        accumulator[accumulator.length - 1].append(document.createTextNode("¿"));
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns element
export function processSub(inputToken) {
    if (inputToken[1].length < 2) {
        return processGroup(inputToken);
    }
    if (inputToken[1][0] == ";") {
        if (/[;]/.test(inputToken[1][inputToken[1].length - 2]) && inputToken[1][inputToken[1].length - 2] == inputToken[1][inputToken[1].length - 1]) {
            return link(parse(inputToken[1].substring(1, inputToken[1].length - 2)));
        } else if (/[;]/.test(inputToken[1][inputToken[1].length - 1])) { // Thanks ChatGPT for the regex!
            return link(parse(inputToken[1].substring(1, inputToken[1].length - 1)));
        } else {
            return link(parse(inputToken[1].substring(1, inputToken[1].length)));
        }
    }
    let endsWithVisible = /^[\)\]\}\|]+$/.test(inputToken[1][inputToken[1].length - 1]); // Thanks ChatGPT for the regex!

    let outputElement = document.createElementNS(MLNameSpace, "mrow");

    outputElement.append(document.createElementNS(MLNameSpace, "mo"));
    outputElement.lastChild.append(document.createTextNode(inputToken[1][0]));

    outputElement.append(link(parse(inputToken[1].substring(1, inputToken[1].length - Number(endsWithVisible)))));

    if (endsWithVisible) {
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode(inputToken[1][inputToken[1].length - 1]));
    }
    return outputElement;
}

// ChatGPT aided
// Returns element
export function processGroup(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mrow");
    for (let i = 0; i < inputToken[1].length; i++) {
        const char = inputToken[1][i];
        if (isAlpha(char)) {
            outputElement.append(document.createElementNS(MLNameSpace, "mi"));
        } else if (isNumber(char)) {
            outputElement.append(document.createElementNS(MLNameSpace, "mn"));
        } else {
            outputElement.append(document.createElementNS(MLNameSpace, "mtext"));
        }
        outputElement.lastChild.append(document.createTextNode(char));
    }
    return outputElement;
}

export function processText(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mtext");
    outputElement.innerHTML = inputToken[1].replaceAll(" ", "&nbsp;");
    return outputElement;
}
