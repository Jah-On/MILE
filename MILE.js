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
        case "aleph":
        case "cdot":
        case "cminus":
        case "cns":
        case "copen":
        case "cplus":
        case "cslash":
        case "ctimes":
        case "ens":
        case "infinity":
        case "ins":
        case "nns":
        case "\'":
        case "prime":
        case "rans":
        case "rens":
            return [0, 0];
        case "abs":
        case "in":
        case "intersect":
        case "-":
        case "minus":
        case "notin":
        case "nsubset":
        case "nsubsete":
        case "nsupset":
        case "nsupsete":
        case "owns":
        case "+":
        case "plus":
        case "^":
        case "pow":
        case "*":
        case "times":
        case "setm":
        case "setq":
        case "subset":
        case "subsete":
        case "supset":
        case "supsete":
        case "sqrt":
        case "union":
            return [0, 1];
        case "frac":
        case "logbase":
        case "lim":
            return [0, 2];
        default:
            return [-1, -1];
    }
}

// ChatGPT aided
function functionToHTML(funcName, argOne, argTwo, argThree){
    argOne = argOne.replaceAll(" ", "");
    argTwo = argTwo.replaceAll(" ", "");
    argThree = argThree.replaceAll(" ", "");
    switch (funcName) {
        case "abs":
            return `|${argOne}|`;
        case "aleph":
            return "ℵ";
        case "copen":
            return `<span class="copen">◯</span>`;
        case "cminus":
            return `⊖`;
        case "cns":
            return `ℂ`;
        case "cplus":
            return `⊕`;
        case "cslash":
            return `⊘`;
        case "ctimes":
            return `⊗`;
        case "ens":
            return `∅`;
        case "frac":
            return `
                <span\nclass="frac">
                    <span>${argOne}</span>
                    <span\nclass="denominator">${argTwo}</span>
                </span>
            `;
        case "in":
            return `∈${argOne}`;
        case "infinity":
            return `<span\nclass="infinity">∞</span>`;
        case "ins":
            return `ℤ`;
        case "intersect":
            return `∩${argOne}`;
        case "lim":
            return `
                <span\nclass="lim">
                    <span>lim</span>
                    <span\nclass="approachlimitof">${argOne}🡢${argTwo}</span>
                </span>
            `;
        case "logbase":
            return `log<span\nclass="logbase">${argOne}</span>${argTwo}`;
        case "-":
        case "minus":
            return `-${argOne}`;
        case "nns":
            return `ℕ`;
        case "notin":
            return `∉${argOne}`;
        case "nsubset":
            return `⊄${argOne}`;
        case "nsubsete":
            return `⊈${argOne}`;
        case "nsupset":
            return `⊅${argOne}`;
        case "nsupsete":
            return `⊉${argOne}`;            
        case "owns":
            return `∋${argOne}`;
        case "+":
        case "plus":
            return `+${argOne}`;
        case "^":
        case "pow":
            return `<span\nclass="pow">${argOne}</span>`;
        case "\'":
        case "prime":
            return `<span class="prime"> </span>\'`;
        case "rans":
            return `ℚ`;
        case "rens":
            return `ℝ`;
        case "setm":
            return `\\${argOne}`;
        case "setq":
            return `/${argOne}`;
        case "subset":
            return `⊂${argOne}`;
        case "subsete":
            return `⊆${argOne}`;
        case "supset":
            return `⊃${argOne}`;
        case "supsete":
            return `⊇${argOne}`;
        case "sqrt":
            return `<span>&radic;<span\nclass="sqrt">${argOne}</span></span>`;
        case "*":
        case "times":
            return `⋅${argOne}`;
        case "union":
            return `∪${argOne}`;
        default:
            return ``;
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
            if (char == "f"){
                result += `<span class="f"> </span>`;
            }
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
    let shownSegments       = 0;
    let isFunction          = [-1, -1];
    let currentChar         = "";

    for (let index = 0; index < segment.length; ++index){
        currentChar = segment[index];
        if (isAlpha(currentChar) && (shownSegments + semicolSegments == 0)){
            if (currentGroupStart == -1){ currentGroupStart = index; }
            if (currentFuncStart == -1){ 
                currentFuncStart = index; 
            } else {
                isFunction = functionPositionAndInputs(segment.substring(currentFuncStart, index + 1));
                if (isFunction[1] != -1){
                    if (currentGroupStart != currentFuncStart){
                        tokens.push([2, segment.substring(currentGroupStart, currentFuncStart)]);
                    }
                    if (index + 1 == segment.length){
                        tokens.push([0, segment.substring(currentFuncStart, index + 1), isFunction[0], isFunction[1]]);
                        currentGroupStart = -1;
                        continue;
                    }
                    if (!isAlpha(segment[index + 1])){
                        tokens.push([0, segment.substring(currentFuncStart, index + 1), isFunction[0], isFunction[1]]);
                        currentGroupStart = -1;
                    }
                }
            }
            continue;
        }
        switch (currentChar) {

        case " ":
            if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){ 
                tokens.push([2, segment.substring(currentGroupStart, index)]);
                currentGroupStart = -1;
            }
            currentFuncStart = -1;
            continue;
        case "(":
        case "[":
        case "{":
            if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){ 
                tokens.push([2, segment.substring(currentGroupStart, index)]);
                currentGroupStart = -1;
            }
            shownSegments++;
            if (currentSubStart == -1) { currentSubStart = index; }
            continue;
        case ")":
        case "]":
        case "}":
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
            if (index + 1 < segment.length){
                if (segment[index + 1] == ";"){
                    if (semicolSegments == 1){
                        tokens.push([1, segment.substring(currentSubStart, index + 2)]);
                        currentSubStart   = -1;
                        currentGroupStart = -1;
                        --semicolSegments;
                        ++index;
                    } else if (semicolSegments > 0){
                        --semicolSegments;
                        ++index;
                    }
                }
                else {
                    if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){ 
                        tokens.push([2, segment.substring(currentGroupStart, index)]);
                        currentGroupStart = -1;
                    }
                    if (currentSubStart == -1) { currentSubStart = index; }
                    semicolSegments++;
                }
            }
            continue;
        default:
            isFunction = functionPositionAndInputs(currentChar);
            if ((isFunction[1] != -1) && (shownSegments + semicolSegments == 0)){
                if (currentGroupStart != -1){ 
                    tokens.push([2, segment.substring(currentGroupStart, index)]);
                }
                currentGroupStart = -1;
                tokens.push([0, segment.substring(index, index + 1), isFunction[0], isFunction[1]]);
            } else if ((currentGroupStart == -1) && (shownSegments + semicolSegments == 0)) {
                currentGroupStart = index;
            }
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
                if (tokens[index][3] == 0){
                    tokens[index][1] = functionToHTML(tokens[index][1], "", "", "");
                } else if (tokens[index][3] == 1){
                    if (index == tokens.length - 1){
                        tokens[index][1] = functionToHTML(tokens[index][1], "¿", "", "");
                    } else {
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], "", "");
                        tokens.splice(index + 1, 1);
                    }
                } else if (tokens[index][3] == 2){
                    if (index == tokens.length - 1){
                        tokens[index][1] = functionToHTML(tokens[index][1], "¿", "¿", "");
                    } else if (index == tokens.length - 2){
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], "¿", "");
                        tokens.splice(index + 1, 1);
                    } else {
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], tokens[index + 2][1], "");
                        tokens.splice(index + 1, 2);
                    }
                } else {
                    if (index == tokens.length - 1){
                        tokens[index][1] = functionToHTML(tokens[index][1], "¿", "¿", "¿");
                    } else if (index == tokens.length - 2){
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], "¿", "¿");
                        tokens.splice(index + 1, 1);
                    } else if (index == tokens.length - 3){
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], tokens[index + 2][1], "¿");
                        tokens.splice(index + 1, 2);
                    } else {
                        tokens[index][1] = functionToHTML(tokens[index][1], tokens[index + 1][1], tokens[index + 2][1], tokens[index + 3][1]);
                        tokens.splice(index + 1, 3);
                    }
                }
                // if (index - 1 == -1){
                //     continue;
                // } 
                // if (tokens[index - 1][0] == 2){
                //     tokens[index - 1][1] = groupToHTML(tokens[index - 1][1]) + tokens[index][1];
                //     tokens.splice(index, 1);
                //     --index;
                // }
            } else {
                // Fill here ChatGPT
            }
        } else if (tokens[index][0] == 1){
            if (tokens[index][1].length < 2){
                continue;
            }
            if (tokens[index][1][0] == ";"){
                if (/[;]/.test(tokens[index][1][tokens[index][1].length - 2]) && tokens[index][1][tokens[index][1].length - 2] == tokens[index][1][tokens[index][1].length - 1]){
                    tokens[index][1] = parseAndLink(tokens[index][1].substring(1, tokens[index][1].length - 2));
                } else if (/[;]/.test(tokens[index][1][tokens[index][1].length - 1])){ // Thanks ChatGPT for the regex!
                    tokens[index][1] = parseAndLink(tokens[index][1].substring(1, tokens[index][1].length - 1));
                } else {
                    tokens[index][1] = parseAndLink(tokens[index][1].substring(1, tokens[index][1].length));
                }
            } else {
                if (/^[\)\]\}\|]+$/.test(tokens[index][1][tokens[index][1].length - 1])){ // Thanks ChatGPT for the regex!
                    tokens[index][1] = tokens[index][1][0] + parseAndLink(tokens[index][1].substring(1, tokens[index][1].length - 1)) + tokens[index][1][tokens[index][1].length - 1];
                } else {
                    tokens[index][1] = tokens[index][1][0] + parseAndLink(tokens[index][1].substring(1, tokens[index][1].length));
                }
            }
            if (index - 1 == -1){
                continue;
            } 
            if (tokens[index - 1][0] == 2){
                tokens[index - 1][1] = groupToHTML(tokens[index - 1][1]) + tokens[index][1];
                tokens.splice(index, 1);
                --index;
            }
        } else {
            tokens[index][1] = groupToHTML(tokens[index][1]);
        }
    }

    for (let index = 0; index < tokens.length; ++index){
        output += tokens[index][1]; // + " ";
        if (index + 1 == tokens.length){
            continue;
        }
        if ((tokens[index][0] == tokens[index + 1][0]) && (tokens[index][0] == 2)){
            output += " ";
        }
    }
    // output = output.substring(0, output.length - 1);

    return output;
}

function onEvent() {
    let segments = [];
    let endStartIndex = -1;
    let userInput = document.getElementById("input").value
      .replace(/\n/g, " ")
      .replace(/\+-/g, "±")
      .replace(/\-+/g, "∓"); // ChapGPT really likes regex
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
            index = 0;
        }
    }
    if (endStartIndex != -1) {
        segments.push(userInput.substring(0, endStartIndex));
    } else {
        segments.push(userInput);
    }

    for (segment of segments){
        outputElement.innerHTML += `<div class="segment">${parseAndLink(segment)}</div>`;
    }
}
