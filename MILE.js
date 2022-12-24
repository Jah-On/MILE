// ChatGPT implementation
function isAlpha(char) {
    return /^[a-zA-Z]+$/.test(char);
}

// ChatGPT implementation
function isNumber(char) {
    return /^[0-9]+$/.test(char);
}

function functionPositionAndInputs(funcName) {
    switch (funcName) {
        case "abs":
        case "-":
        case "minus":
        case "+":
        case "plus":
        case "^":
        case "pow":
        case "*":
        case "times":
        case "sqrt":
            return [0, 1];
        case "logbase":
            return [0, 2];
            // return [1, 2];
        default:
            return [0, 0];
    }
}

// ChatGPT aided
function functionToHTML(funcName, argOne, argTwo, argThree){
    switch (funcName) {
        case "abs":
            return `|${argOne}|`;
        case "-":
        case "minus":
            return "- " + argOne;
        case "+":
        case "plus":
            return "+ " + argOne;
        case "^":
        case "pow":
            return `<sup>${argOne}</sup>`;
        case "*":
        case "times":
            return "⋅ " + argOne;
        case "sqrt":
            return "";
        case "logbase":
            return `log<sub>${argOne}</sub>${argTwo}`;
        default:
            return "";
    }
}

// ChatGPT aided
function groupToHTML(group) {
    let result = "";
    for (let i = 0; i < group.length; i++) {
        const char = group[i];
        if (!isAlpha(char)) {
            result += char;
        } else {
            result += `<i>${char}</i>`;
        }
    }
    return result;
}

function parseAndLink(segment){
    let output              = "";
    let tokens              = [];
    let currentFuncStart    = -1;
    let currentGroupStart   = -1;
    let currentSubStart     = -1;
    let semicolSegments     = 0;
    let lastCharSemicol     = false;
    let shownSegments       = 0;
    let isFunction          = [-1, -1];
    let currentChar         = "";

    for (let index = 0; index < segment.length; ++index){
        currentChar = segment[index];
        if (isAlpha(currentChar) && (shownSegments + semicolSegments == 0)){
            if (currentFuncStart == -1){ currentFuncStart = index; }
            if (currentGroupStart == -1){ currentGroupStart = index; }
            lastCharSemicol = false;
            continue;
        }
        isFunction = functionPositionAndInputs(segment.substring(currentFuncStart, index));
        if (isFunction[1] != 0){
            tokens.push([2, segment.substring(currentGroupStart, currentFuncStart)]);
            tokens.push([0, segment.substring(currentFuncStart, index), isFunction[0], isFunction[1]]);
            currentGroupStart = -1;
        }
        switch (currentChar) {

        case " ":
            if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){ 
                tokens.push([2, segment.substring(currentGroupStart, index)]);
                currentGroupStart = -1;
            }
            continue;
        case "(":
        case "[":
        case "{":
            lastCharSemicol = false;
            shownSegments++;
            if (currentSubStart == -1) { currentSubStart = index; }
            continue;
        case ")":
        case "]":
        case "}":
            lastCharSemicol = false;
            if (shownSegments > 0){
                shownSegments--;
                if ((shownSegments == 0) && (shownSegments + semicolSegments == 0)){
                    tokens.push([1, segment.substring(currentSubStart, index + 1)]);
                    currentSubStart   = -1;
                    currentGroupStart = -1;
                }
            }
            continue;
        case ";":
            if (!lastCharSemicol && (semicolSegments > 0)){
                semicolSegments--;
                if ((semicolSegments == 0) && (shownSegments + semicolSegments == 0)){
                    tokens.push([1, segment.substring(currentSubStart, index + 1)]);
                    currentSubStart   = -1;
                    currentGroupStart = -1;
                }
            } else {
                if (currentSubStart == -1) { currentSubStart = index; }
                semicolSegments++;
            }
            continue;
        default:
            isFunction = functionPositionAndInputs(currentChar);
            if ((isFunction[1] != 0) && (shownSegments + semicolSegments == 0)){
                if (currentGroupStart != -1){ 
                    tokens.push([2, segment.substring(currentGroupStart, index)]);
                }
                currentGroupStart = -1;
                tokens.push([0, segment.substring(index, index + 1), isFunction[0], isFunction[1]]);
            } else if ((currentGroupStart == -1) && (shownSegments + semicolSegments == 0)) {
                currentGroupStart = index;
            }
            lastCharSemicol = false;
            continue;
        }
    }
    if (currentSubStart != -1){ 
        tokens.push([1, segment.substring(currentSubStart, segment.length)]);
    } else if (currentGroupStart != -1){ 
        tokens.push([2, segment.substring(currentGroupStart, segment.length)]);
    }

    for (let index = tokens.length - 1; index >= 0; --index){
        if (tokens[index][0] == 0){
            if (tokens[index][2] == 0){
                if (tokens[index][3] == 1){
                    if (index == tokens.length - 1){
                        tokens[index] = functionToHTML(tokens[index], "¿", "", "");
                        continue;
                    }
                    tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], "", "");
                    tokens.splice(index + 1, 1);
                } else if (tokens[index][3] == 2){
                    if (index == tokens.length - 1){
                        tokens[index] = functionToHTML(tokens[index][1], "¿", "¿", "");
                        continue;
                    }
                    if (index == tokens.length - 2){
                        tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], "¿", "");
                        tokens.splice(index + 1, 1);
                        continue;
                    }
                    tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], tokens[index + 2], "");
                    tokens.splice(index + 1, 2);
                } else {
                    if (index == tokens.length - 1){
                        tokens[index] = functionToHTML(tokens[index][1], "¿", "¿", "¿");
                        continue;
                    }
                    if (index == tokens.length - 2){
                        tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], "¿", "¿");
                        tokens.splice(index + 1, 1);
                        continue;
                    }
                    if (index == tokens.length - 3){
                        tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], tokens[index + 2], "¿");
                        tokens.splice(index + 1, 2);
                        continue;
                    }
                    tokens[index] = functionToHTML(tokens[index][1], tokens[index + 1], tokens[index + 2], tokens[index + 3]);
                    tokens.splice(index + 1, 3);
                }
            } else {

            }
        } else if (tokens[index][0] == 1){
            if (tokens[index][1].length < 2){
                tokens[index] = tokens[index][1];
                continue;
            }
            if (tokens[index][1][0] == ";"){
                if (/[;]/.test(tokens[index][1][tokens[index][1].length - 1])){ // Thanks ChatGPT for the regex!
                    tokens[index] = parseAndLink(tokens[index][1].substring(1, tokens[index][1].length - 1));
                } else {
                    tokens[index] = parseAndLink(tokens[index][1].substring(1, tokens[index][1].length));
                }
            } else {
                if (/[([{|]/.test(tokens[index][1][tokens[index][1].length - 1])){ // Thanks ChatGPT for the regex!
                    tokens[index] = tokens[index][1][0] + parseAndLink(tokens[index][1].substring(1, tokens[index][1].length - 1)) + tokens[index][1][tokens[index][1].length - 1];
                } else {
                    tokens[index] = tokens[index][1][0] + parseAndLink(tokens[index][1].substring(1, tokens[index][1].length));
                }
            }
        } else {
            tokens[index] = groupToHTML(tokens[index][1]);
        }
    }

    for (let index = 0; index < tokens.length; ++index){
        output += tokens[index] + " ";
    }

    return output;
}

function onEvent() {
    let segments = [];
    let endStartIndex = -1;
    let userInput = document.getElementById("input").value
      .replace(/\n/g, " ")
      .replace(/\+-/g, "±"); // ChapGPT really likes regex
    let outputElement = document.getElementById("output");
  
    outputElement.innerHTML = "";
  
    // ChatGPT condensed implementation
    for (let index = 0; index < userInput.length; ++index) {
        if (userInput.substr(index, 3).toLowerCase() == "end") {
            endStartIndex = index;
        } else if 
        (   endStartIndex != -1 &&
            !isAlpha(userInput[index]) &&
            (index - endStartIndex) % 4 == 3 
        ) 
        {
            segments.push(userInput.substring(0, endStartIndex));
            userInput = userInput.substring(index, userInput.length);
            endStartIndex = -1;
            i = 0;
        }
    }
    if (endStartIndex != -1) {
        segments.push(userInput.substring(0, endStartIndex));
    } else {
        segments.push(userInput);
    }

    for (segment of segments){
        outputElement.innerHTML += `<p>${parseAndLink(segment)}</p>`;
    }
}
