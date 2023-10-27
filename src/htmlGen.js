import {FUNCTION, charMap, leftOneChar, operators,
    middlePlusOneChar, MLNameSpace, middlePlusOne,
    generationMap
} from "./constants.js"
import {
    processLeftFunction, processMiddleFunction
} from "./processors.js"
import { MathElement, MathStyle } from "./types.js";

/* ### */

const STYLES = {"largeop":"true", "symmetric":"true"};

// ChatGPT aided
// Returns element
export function functionToHTML(funcName, argElements) {
    let ID = "";
    let outputElement = document.createElementNS(MLNameSpace, "mrow");
    outputElement.setAttribute("displaystyle", "true");
    if (generationMap.hasOwnProperty(funcName)) {
        recursiveHTMLGenerator(outputElement, generationMap[funcName], argElements);
        return outputElement;
    }
    if (leftOneChar.includes(funcName)) {
        recursiveHTMLGenerator(
            outputElement, 
            [new MathElement("mo", [funcName]), 0], 
            argElements
        );
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName)) {
        recursiveHTMLGenerator(
            outputElement,
            [new MathElement("mo", [
                new MathStyle(Object.keys(STYLES)[0], STYLES[Object.keys(STYLES)[0]]),
                new MathStyle(Object.keys(STYLES)[1], STYLES[Object.keys(STYLES)[1]]),
                operators[funcName]
            ]), 0],
            argElements
        );
        return outputElement;
    }
    if (operators.hasOwnProperty(funcName.slice(0, -1))) {
        if (funcName.slice(-1) == "o") {
            recursiveHTMLGenerator(
                outputElement,
                [new MathElement("mover", [
                    new MathElement("mo", [
                        new MathStyle(Object.keys(STYLES)[0], STYLES[Object.keys(STYLES)[0]]),
                        new MathStyle(Object.keys(STYLES)[1], STYLES[Object.keys(STYLES)[1]]),
                        operators[funcName.slice(0, -1)]
                    ]), 0
                ]), 1],
                argElements
            );
            return outputElement;
        }
        if (funcName.slice(-1) == "u") {
            recursiveHTMLGenerator(
                outputElement,
                [new MathElement("munder", [
                    new MathElement("mo", [
                        new MathStyle(Object.keys(STYLES)[0], STYLES[Object.keys(STYLES)[0]]),
                        new MathStyle(Object.keys(STYLES)[1], STYLES[Object.keys(STYLES)[1]]),
                        operators[funcName.slice(0, -1)]
                    ]), 0
                ]), 1],
                argElements
            );
            return outputElement;
        }
        if (funcName.slice(-1) == "b") {
            recursiveHTMLGenerator(
                outputElement,
                [new MathElement("munderover", [
                    new MathElement("mo", [
                        new MathStyle(Object.keys(STYLES)[0], STYLES[Object.keys(STYLES)[0]]),
                        new MathStyle(Object.keys(STYLES)[1], STYLES[Object.keys(STYLES)[1]]),
                        operators[funcName.slice(0, -1)]
                    ]), 0, 1
                ]), 2],
                argElements
            );
            return outputElement;
        }
    }
    if (middlePlusOneChar.includes(funcName)) {
        recursiveHTMLGenerator(
            outputElement,
            [0, new MathElement("mo", [funcName]), 1],
            argElements
        );
        return outputElement;
    }

    return outputElement;
}

function recursiveHTMLGenerator(parentNode, input, args) {
    for (const property of input) {
        if (property instanceof MathElement){
            parentNode.append(document.createElementNS(MLNameSpace, property.type));
            recursiveHTMLGenerator(parentNode.lastChild, property.children, args);
        } else if (property instanceof MathStyle) {
            parentNode.setAttribute(property.attribute, property.value);
        } else if (typeof property == "string") {
            parentNode.append(document.createTextNode(property));
        } else if (typeof property == "number") {
            parentNode.append(args[property]);
        }
    }
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
