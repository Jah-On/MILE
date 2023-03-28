import {
NUMBER, VARIABLE, FUNCTION, CONSTANT, GROUP, STRING, 
singleChar, leftOne, leftOneChar, leftTwo, operators,
middlePlusOne, middlePlusOneChar, middlePlusTwo, MLNameSpace
} from "./constants.js"
import { isAlpha, isNumber } from "./helper.js"
import { link } from "./htmlGen.js";

// Return 2 wide integer array
export function functionData(functionNameString) {
    if (singleChar.hasOwnProperty(functionNameString)) {
        return [0, 0]; // Right and 0 arguments
    }
    if (
        leftOne.hasOwnProperty(functionNameString) ||
        leftOneChar.hasOwnProperty(functionNameString) ||
        operators.hasOwnProperty(functionNameString)
    ) {
        return [0, 1]; // Right and 1 arguments
    }
    if (leftTwo.hasOwnProperty(functionNameString)) {
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
        middlePlusOne.hasOwnProperty(functionNameString) ||
        middlePlusOneChar.hasOwnProperty(functionNameString)
    ) {
        return [1, 1]; // Middle and 1 argument right
    }
    if (
        middlePlusTwo.hasOwnProperty(functionNameString)
    ) {
        return [1, 2]; // Middle and 2 arguments right
    }
    return [-1, -1];
}

// function hello_world

export function parse(stringRow, listStringLiterals) {
    let tokens = [];

    let isFunction = [0, 0];
    let groupCount = [0, 0];
    let createToken = true;
    for (let index = 0; index < stringRow.length; ++index) {
        if (/;/.test(stringRow[index]) && !groupCount[1]){
            numberLast = false;
            if ((groupCount[0] != 0) && (semicolonLast)){
                groupCount[0] -= 2;
            }
            if ((groupCount[0] == 0) && (semicolonLast)){
                semicolonLast = false;
                tokens.push([1, stringRow.substring(start, index + 1)]);
                start = -1;
                continue;
            }
            if ((start != -1) && (groupCount[0] == 0)){
                isFunction = functionData(stringRow.substring(start, index));
                if (isFunction[1] != -1) {
                    tokens.push([0, stringRow.substring(start, index), isFunction[0], isFunction[1]]);
                } else {
                    tokens.push([2, stringRow.substring(start, index)]);
                }
                start = -1;
            }
            ++groupCount[0];
            semicolonLast = true;
            if (start == -1){
                start = index;
            }
            continue;
        }
        semicolonLast = false;
        if (/[([{]/.test(stringRow[index]) && !groupCount[0]){
            if ((start != -1) && (groupCount[1] == 0)){
                isFunction = functionData(stringRow.substring(start, index));
                if (isFunction[1] != -1) {
                    tokens.push([0, stringRow.substring(start, index), isFunction[0], isFunction[1]]);
                } else {
                    tokens.push([2, stringRow.substring(start, index)]);
                }
                start = -1;
            }
            ++groupCount[1];
            if (start == -1){
                start = index;
            }
            continue;
        }
        if (/[)\]}]/.test(stringRow[index]) && !groupCount[0]){
            numberLast = false;
            --groupCount[1];
            if (groupCount[1] == 0){
                tokens.push([1, stringRow.substring(start, index + 1)]);
                start = -1;
            }
            continue;
        }
        if (/\0/.test(stringRow[index])){
            if (groupCount[0] + groupCount[1]){
                stringRow = stringRow.replace(/\0/, listStringLiterals.shift());
            } else {
                tokens.push([STRING, listStringLiterals.shift()]);
                stringRow = stringRow.replace(/\0/, "");
            }
            continue;
        }
        if (groupCount[0] + groupCount[1]){ continue; }
        if (isAlpha(stringRow[index])) {
            if (createToken){
                tokens.push([VARIABLE, stringRow[index]]);
                continue;
            }
            if (tokens[tokens.length - 1][0] != VARIABLE){
                tokens.push([VARIABLE, stringRow[index]]);
                continue;
            }
            tokens[tokens.length - 1][1] += stringRow[index];
            isFunction = functionData(tokens[tokens.length - 1][1]);
            if (isFunction[1] != -1) {
                tokens.push([FUNCTION, stringRow[index], isFunction[0], isFunction[1]]);
            }
            continue;
        }
        if (/\./.test(stringRow[index]) || isNumber(stringRow[index])) {
            if (createToken){
                tokens.push([NUMBER, stringRow[index]]);
                continue;
            }
            if (tokens[tokens.length - 1][0] != NUMBER){
                tokens.push([NUMBER, stringRow[index]]);
                continue;
            }
            tokens[tokens.length - 1][1] += stringRow[index];
            continue;
        }
        if (/ /.test(stringRow[index])){
            createToken = true;
            continue;
        }
        isFunction = functionData(stringRow[index]);
        if (isFunction[1] != -1) {
            tokens.push([FUNCTION, stringRow[index], isFunction[0], isFunction[1]]);
        }
    }
    if (groupCount[0] + groupCount[1]){
        tokens.push([1, stringRow.substring(start)]);
    }

    return tokens;
}

export function preProccess(stringMILCode){
    let stringLiterals = [];
    let stringsRemoved = stringMILCode;
    while (stringsRemoved.search(/"(?:[^"\\]|\\.)*("|$)/) != -1){
        stringLiterals.push(stringsRemoved.match(/"(?:[^"\\]|\\.)*("|$)/)[0]);
        stringsRemoved = stringsRemoved.replace(/"(?:[^"\\]|\\.)*("|$)/, String.fromCharCode(0));
    }
    
    stringsRemoved = stringsRemoved
                    .replaceAll("\n", " ")
                    .replaceAll("+-", "±")
                    .replaceAll("-+", "∓")
                    .replaceAll(/(^| ) +($| )/g, " ");
    let segments = stringsRemoved.split(/(^| )end($| )/gi);
    while (segments.indexOf(" ") != -1){
        segments.splice(segments.indexOf(" "), 1);
    }
    while (segments.indexOf("") != -1){
        segments.splice(segments.indexOf(""), 1);
    }

    let returnElements = [];
    let sliceStart = 0;
    let sliceEnd   = 0;
    for (const segment of segments) {
        sliceEnd += (segment.match(/\0/g) || []).length;
        returnElements.push(link(parse(segment, stringLiterals.slice(sliceStart, sliceEnd))));
        sliceStart += (segment.match(/\0/g) || []).length;
    }

    return returnElements;
}
