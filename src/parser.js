import {
NUMBER, VARIABLE, SYMBOL, FUNCTION, GROUP_START, GROUP_END, 
STRING, leftOne, leftOneChar, 
leftTwo, operators, middlePlusOne, middlePlusOneChar, 
middlePlusTwo, MLNameSpace
} from "./constants.js"
import { isAlpha, isNumber, isUTF_8 } from "./helper.js"
import { link } from "./htmlGen.js";
import { processor } from "./processors.js";

// Return 2 wide integer array
export function functionData(functionNameString) {
    if (
        leftOne.includes(functionNameString) ||
        leftOneChar.includes(functionNameString) ||
        operators.hasOwnProperty(functionNameString)
    ) {
        return [0, 1]; // Right and 1 arguments
    }
    if (leftTwo.includes(functionNameString)) {
        return [0, 2]; // Right and 2 arguments
    }
    if (operators.hasOwnProperty(functionNameString.slice(0, -1))) {
        if (
            functionNameString.slice(-1) == "o" ||
            functionNameString.slice(-1) == "u"
        ) {
            return [0, 2]; // Right and 2 arguments
        }
        if (functionNameString.slice(-1) == "b") {
            return [0, 3]; // Right and 3 arguments
        }
    }
    if (
        middlePlusOne.includes(functionNameString) ||
        middlePlusOneChar.includes(functionNameString)
    ) {
        return [1, 1]; // Middle and 1 argument right
    }
    if (
        middlePlusTwo.includes(functionNameString)
    ) {
        return [1, 2]; // Middle and 2 arguments right
    }
    return [-1, -1];
}

export function parse(stringRow, stringLiterals) {
    let tokens = [];

    let createToken   = true;
    let isFunction    = [0, 0];
    let groupItems    = [];
    let lastSemicolon = false;
    for (let index = 0; index < stringRow.length; ++index) {
        if (stringRow[index] == ";"){
            if (!lastSemicolon){
                tokens.push([GROUP_START, ";", 0, 0]);
                groupItems.push(tokens.length);
                lastSemicolon = true;
            } else {
                if (tokens.length > 0 && tokens[tokens.length - 2][0] == VARIABLE) {
                    isFunction = functionData(tokens[tokens.length - 2][1]);
                    if (isFunction[0] != -1) {
                        if (isFunction[1] == 0) {
                            tokens[tokens.length - 2][0] = SYMBOL;
                        } else {
                            tokens[tokens.length - 2][0] = FUNCTION;
                        }
                        tokens[tokens.length - 2][2] = isFunction[0];
                        tokens[tokens.length - 2][3] = isFunction[1];
                    }
                }
                groupItems.pop();
                tokens[tokens.length - 1][0] = GROUP_END;
                tokens[tokens.length - 1][1] = ";;";
                tokens[tokens.length - 1][2] = tokens.length - groupItems.pop() - 1;
                lastSemicolon = false;
            }
            continue;
        }
        lastSemicolon = false;
        if (/\)|\]|\}/.test(stringRow[index])){
            if (tokens.length > 0 && tokens[tokens.length - 1][0] == VARIABLE) {
                isFunction = functionData(tokens[tokens.length - 1][1]);
                if (isFunction[0] != -1) {
                    if (isFunction[1] == 0) {
                        tokens[tokens.length - 1][0] = SYMBOL;
                    } else {
                        tokens[tokens.length - 1][0] = FUNCTION;
                    }
                    tokens[tokens.length - 1][2] = isFunction[0];
                    tokens[tokens.length - 1][3] = isFunction[1];
                }
            }
            tokens.push([GROUP_END, stringRow[index], tokens.length - groupItems.pop(), 0]);
            continue;
        }
        if (/\(|\[|\{/.test(stringRow[index])){
            tokens.push([GROUP_START, stringRow[index], 0, 0]);
            groupItems.push(tokens.length);
            continue;
        }
        if (isAlpha(stringRow[index])) {
            if (createToken) {
                tokens.push([VARIABLE, "", 0, 0]);
                createToken = false;
            } else if (tokens[tokens.length - 1][0] != VARIABLE) {
                tokens.push([VARIABLE, "", 0, 0]);
            }
            tokens[tokens.length - 1][1] += stringRow[index];
            continue;
        }
        if (tokens.length > 0 && tokens[tokens.length - 1][0] == VARIABLE) {
            isFunction = functionData(tokens[tokens.length - 1][1]);
            if (isFunction[0] != -1) {
                if (isFunction[1] == 0) {
                    tokens[tokens.length - 1][0] = SYMBOL;
                } else {
                    tokens[tokens.length - 1][0] = FUNCTION;
                }
                tokens[tokens.length - 1][2] = isFunction[0];
                tokens[tokens.length - 1][3] = isFunction[1];
            }
        }
        if (isNumber(stringRow[index]) || stringRow[index] == ".") {
            if (createToken) {
                tokens.push([NUMBER, "", 0, 0]);
                createToken = false;
            } else if (tokens[tokens.length - 1][0] != NUMBER) {
                tokens.push([NUMBER, "", 0, 0]);
            }
            tokens[tokens.length - 1][1] += stringRow[index];
            continue;
        }
        if (isUTF_8(stringRow[index])) {
            if (createToken) {
                tokens.push([STRING, "", 0, 0]);
                createToken = false;
            } else if (tokens[tokens.length - 1][0] != STRING) {
                tokens.push([STRING, "", 0, 0]);
            }
            tokens[tokens.length - 1][1] += stringRow[index];
            isFunction = functionData(tokens[tokens.length - 1][1]);
            if (isFunction[0] != -1) {
                tokens[tokens.length - 1][0] = FUNCTION;
                tokens[tokens.length - 1][2] = isFunction[0];
                tokens[tokens.length - 1][3] = isFunction[1];
            }
            continue;
        }
        if (/\0/.test(stringRow[index])) {
            tokens.push([STRING, stringLiterals.shift(), 0, 0]);
            createToken = true;
            continue;
        }
        if (/ /.test(stringRow[index])) {
            createToken = true;
            continue;
        }
        isFunction = functionData(stringRow[index]);
        if (isFunction[0] != -1) {
            tokens.push([FUNCTION, stringRow[index], isFunction[0], isFunction[1]]);
            createToken = true;
            continue;
        } else {
            tokens.push([STRING, stringRow[index], 0, 0]);
            createToken = true;
            continue;
        }
    }
    if (tokens.length > 0 && tokens[tokens.length - 1][0] == VARIABLE) {
        isFunction = functionData(tokens[tokens.length - 1][1]);
        if (isFunction[0] != -1) {
            if (isFunction[1] == 0) {
                tokens[tokens.length - 1][0] = SYMBOL;
            } else {
                tokens[tokens.length - 1][0] = FUNCTION;
            }
            tokens[tokens.length - 1][2] = isFunction[0];
            tokens[tokens.length - 1][3] = isFunction[1];
        }
    }

    for (const groupItem of groupItems) {
        tokens.push([GROUP_END, "", tokens.length - groupItem, 0]);
    }

    return tokens;
}

// export function parse(parent, data="", strings=[]) {

//     return tokens;
// }

export function preProcess(stringMILCode){
    let stringLiterals = [];
    let stringsRemoved = stringMILCode;
    while (stringsRemoved.search(/"(?:[^"\\]|\\.)*("|$)/) != -1){
        stringLiterals.push(stringsRemoved.match(/"(?:[^"\\]|\\.)*("|$)/)[0].replace(/"/g, ""));
        stringsRemoved = stringsRemoved.replace(/"(?:[^"\\]|\\.)*("|$)/, String.fromCharCode(0));
    }
    
    stringsRemoved = stringsRemoved
                    .replaceAll(/(?<!\n)\n(?!\n)/g, " ")
                    .replaceAll(/(^| ) +($| )/g, " ");
    let segments = stringsRemoved.split(/(?<=\n)\n/g);

    let returnElements = [];
    let sliceStart = 0;
    let sliceEnd   = 0;
    for (const segment of segments) {
        if (segment == ""){ 
            returnElements.push(document.createElement("br"));
            continue;
        }
        if (/^!.+!$/gm.test(segment)) {
            const image = new Image();
            image.src = segment.replaceAll(/\n| /g, "").slice(1, -1);
            image.className = "embeddedImage";
            returnElements.push(image);
            continue;
        }
        sliceEnd += (segment.match(/\0/g) || []).length;
        returnElements.push(link(processor(parse(segment, stringLiterals.slice(sliceStart, sliceEnd)))));
        sliceStart += (segment.match(/\0/g) || []).length;
    }

    return returnElements;
}
