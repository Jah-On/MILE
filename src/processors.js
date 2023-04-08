import {NUMBER, VARIABLE, SYMBOL, FUNCTION, GROUP_START, 
        GROUP_END, STRING, singleChar, MLNameSpace } from "./constants.js";
import { isAlpha, isNumber, isUTF_8 } from "./helper.js"
import { functionToHTML, link } from "./htmlGen.js"
import { preProccess } from "./parser.js"

/* ### */

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

export function processMiddleFunction(functionToken, tokenLeft, tokensRight) {
    let accumulator = [];
    if (tokenLeft.length > 0) {
        accumulator.push(tokenLeft[0][1]);
    } else {
        accumulator.push(document.createElementNS(MLNameSpace, "mtext"));
        accumulator[accumulator.length - 1].append(document.createTextNode("¿"));
    }
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

export function processNumber(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mn");
    outputElement.append(document.createTextNode(inputToken[1]));
    return outputElement;
}

export function processSymbol(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mtext");
    outputElement.append(document.createTextNode(singleChar[inputToken[1]]));
    return outputElement;
}

export function processGroup(inputTokens) {
    let outputElement = document.createElementNS(MLNameSpace, "mrow");

    if (inputTokens[0][1] != ";") {
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode(inputTokens[0][1]));
    }

    let endsWithVisible = /^[\)\]\}\|]+$/.test(inputTokens[inputTokens.length - 1][1]); // Thanks ChatGPT for the regex!
    outputElement.append(link(inputTokens.slice(1, inputTokens.length - 1)));

    if (endsWithVisible) {
        outputElement.append(document.createElementNS(MLNameSpace, "mo"));
        outputElement.lastChild.append(document.createTextNode(inputTokens[inputTokens.length - 1][1]));
    }
    return outputElement;
}

export function processVariable(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mi");
    outputElement.append(document.createTextNode(inputToken[1]));
    return outputElement;
}

export function processString(inputToken) {
    let outputElement = document.createElementNS(MLNameSpace, "mtext");
    outputElement.append(document.createTextNode(inputToken[1]));
    outputElement.innerHTML = outputElement.innerHTML.replaceAll(" ", "&nbsp;");
    return outputElement;
}

export function processor(inputTokens) {
    for (let index = 0; index < inputTokens.length; ++index) {
        let type = inputTokens[index][0];
        switch (type) {
            case NUMBER:
                inputTokens[index][1] = processNumber(inputTokens[index]);
                break;
            case VARIABLE:
                inputTokens[index][1] = processVariable(inputTokens[index]);
                break;
            case SYMBOL:
                inputTokens[index][1] = processSymbol(inputTokens[index]);
                break;
            case STRING:
                inputTokens[index][1] = processString(inputTokens[index]);
                break;
            default:
                break;
        }
    }
    let groupOpenIndexes = [];
    for (let index = 0; index < inputTokens.length; ++index) {
        let type = inputTokens[index][0];
        switch (type) {
            case GROUP_START:
                groupOpenIndexes.push(index);
                break;
            case GROUP_END:
                if (groupOpenIndexes.length == 0) {
                    inputTokens[index][0] = STRING;
                    inputTokens[index][1] = processString(inputTokens[index]);
                    break;
                }
                let groupStartIndex = groupOpenIndexes.pop();
                inputTokens[groupStartIndex][1] = processGroup(inputTokens.slice(groupStartIndex, index + 1));
                inputTokens.splice(groupStartIndex + 1, index - groupStartIndex);
                index = groupStartIndex;
                break;
            default:
                break;
        }
    }

    return inputTokens;
}