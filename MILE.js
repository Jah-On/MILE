// ChatGPT implementation
// Returns boolean
function isAlpha(char) {
    return /^[a-zA-Z]+$/.test(char);
}

// ChatGPT implementation
// Returns boolean
function isNumber(char) {
    return /^[0-9]+$/.test(char);
}

// Return 2 wide integer array
function functionPositionAndInputs(functionNameString) {
    switch (functionNameString) {
        case "aleph":
        case "ens":
        case "infinity":
        case "ins":
        case "nns":
        case "\'":
        case "prime":
        case "rans":
        case "rens":
            return [0, 0]; // Right and 0 arguments
        case "abs":
        case "coprod":
        case "int":
        case "iint":
        case "iiint":
        case "lim":
        case "liminf":
        case "limsup":
        case "lint":
        case "llint":
        case "lllint":
        case "-":
        case "minus":
        case "neg":
        case "+":
        case "plus":
        case "prod":
        case "sum":
        case "sqrt":
            return [0, 1]; // Right and 1 arguments
        case "coprodo":
        case "coprodu":
        case "frac":
        case "into":
        case "intu":
        case "iinto":
        case "iintu":
        case "iiinto":
        case "iiintu":
        case "limo":
        case "limu":
        case "liminfo":
        case "liminfu":
        case "limsupo":
        case "limsupu":
        case "linto":
        case "lintu":
        case "llinto":
        case "llintu":
        case "lllinto":
        case "lllintu":
        case "logbase":
        case "sumo":
        case "sumu":
        case "prodo":
        case "produ":
            return [0, 2]; // Right and 2 arguments
        case "coprodb":
        case "intb":
        case "iintb":
        case "iiintb":
        case "limb":
        case "liminfb":
        case "limsupb":
        case "lintb":
        case "llintb":
        case "lllintb":
        case "prodb":
        case "sumb":
            return [0, 3]; // Right and 3 arguments
        case "and":
        case "approx":
        case "cdot":
        case "cminus":
        case "cns":
        case "copen":
        case "cplus":
        case "cslash":
        case "ctimes":
        case "def":
        case "div":
        case "|":
        case "divides":
        case "dlarrow":
        case "dlrarrow":
        case "drarrow":
        case "=":
        case "equals":
        case "equiv":
        case ">":
        case "gthan":
        case "gethan":
        case "geslant":
        case "/":
        case "imgof":
        case "in":
        case "intersect":
        case "<":
        case "lthan":
        case "lethan":
        case "leslant":
        case ">>":
        case "mgthan":
        case "<<":
        case "mlthan":
        case "ndivides":
        case "notin":
        case "noteq":
        case "nprec":
        case "nsubset":
        case "nsubsete":
        case "nsucc":
        case "nsupset":
        case "nsupsete":
        case "owns":
        case "or":
        case "origof":
        case "ortho":
        case "parallel":
        case "^":
        case "pow":
        case "prec":
        case "preceq":
        case "precsim":
        case "prop":
        case "setm":
        case "setq":
        case "sim":
        case "simeq":
        case "stimes":
        case "subset":
        case "subsete":
        case "succ":
        case "succeq":
        case "succsim":
        case "supset":
        case "supsete":
        case "*":
        case "times":
        case "toward":
        case "union":
        case "xtimes":
            return [1, 2]; // Middle and 2 arguments
        default:
            return [-1, -1];
    }
}

// ChatGPT aided
// Returns string
function functionToHTML(funcName, argStrings){
    for (let index = 0;  index < argStrings.length; ++index){
        argStrings[index] = argStrings[index].replaceAll(" ", "");
    }
    switch (funcName) {
        case "abs":
            return `|${argStrings[0]}|`;
        case "aleph":
            return "ℵ";
        case "and":
            return `${argStrings[0]}<span class="and">^</span>${argStrings[1]}`;
        case "approx":
            return `${argStrings[0]}≈${argStrings[1]}`;
        case "copen":
            return `${argStrings[0]}<span class="copen">◯</span>${argStrings[1]}`;
        case "coprod":
            return `<span\nclass="operator">∐</span> ${argStrings[0]}`;
        case "coprodb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∐<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "coprodo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∐</span> ${argStrings[1]}`;
        case "coprodu":
            return `<span\nclass="operator">∐<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;
        case "cminus":
            return `${argStrings[0]}⊖${argStrings[1]}`;
        case "cns":
            return `${argStrings[0]}ℂ${argStrings[1]}`;
        case "cplus":
            return `${argStrings[0]}⊕${argStrings[1]}`;
        case "cslash":
            return `${argStrings[0]}⊘${argStrings[1]}`;
        case "ctimes":
            return `${argStrings[0]}⊗${argStrings[1]}`;
        case "def":
            return `${argStrings[0]}≝${argStrings[1]}`;        
        case "/":
            return `${argStrings[0]}/${argStrings[1]}`;
        case "div":
            return `${argStrings[0]}÷${argStrings[1]}`;
        case "|":
        case "divides": 
            return `${argStrings[0]}∣${argStrings[1]}`;
        case "dlarrow": 
            return `${argStrings[0]}⇐${argStrings[1]}`;
        case "dlrarrow": 
            return `${argStrings[0]}⇔${argStrings[1]}`;
        case "drarrow": 
            return `${argStrings[0]}⇒${argStrings[1]}`;
        case "=":
        case "equals": 
            return `${argStrings[0]}=${argStrings[1]}`;
        case "equiv": 
            return `${argStrings[0]}≡${argStrings[1]}`;
        case "ens":
            return `∅`;
        case "frac":
            return `
                <span\nclass="frac">
                    <span>${argStrings[0]}</span>
                    <span\nclass="denominator">${argStrings[1]}</span>
                </span>
            `;
        case "gthan":
            return `${argStrings[0]}>${argStrings[1]}`;
        case "gethan":
            return `${argStrings[0]}≥${argStrings[1]}`;
        case "geslant":
            return `${argStrings[0]}⩾${argStrings[1]}`;
        case "in":
            return `${argStrings[0]}∈${argStrings[1]}`;
        case "infinity":
            return `<span\nclass="infinity">∞</span>`;
        case "imgof":
            return `${argStrings[0]}⊷${argStrings[1]}`;
        case "ins":
            return `ℤ`;

        case "int":
            return `<span\nclass="operator">∫</span> ${argStrings[0]}`;
        case "intb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∫<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "into":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∫</span> ${argStrings[1]}`;
        case "intu":
            return `<span\nclass="operator">∫<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "iint":
            return `<span\nclass="operator">∬</span> ${argStrings[0]}`;
        case "iintb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∬<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "iinto":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∬</span> ${argStrings[1]}`;
        case "iintu":
            return `<span\nclass="operator">∬<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "iiint":
            return `<span\nclass="operator">∭</span> ${argStrings[0]}`;
        case "iiintb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∭<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "iiinto":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∭</span> ${argStrings[1]}`;
        case "iiintu":
            return `<span\nclass="operator">∭<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;    

        case "intersect":
            return `${argStrings[0]}∩${argStrings[1]}`;
        case "lthan":
            return `${argStrings[0]}<${argStrings[1]}`;
        case "lethan":
            return `${argStrings[0]}≤${argStrings[1]}`;
        case "leslant":
            return `${argStrings[0]}⩽${argStrings[1]}`;

        case "lim":
            return `<span\nclass="operator">lim</span> ${argStrings[0]}`;
        case "limb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "limo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim</span> ${argStrings[1]}`;
        case "limu":
            return `<span\nclass="operator">lim<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "liminf":
            return `<span\nclass="operator">lim inf</span> ${argStrings[0]}`;
        case "liminfb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim inf<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "liminfo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim inf</span> ${argStrings[1]}`;
        case "liminfu":
            return `<span\nclass="operator">lim inf<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "limsup":
            return `<span\nclass="operator">lim sup</span> ${argStrings[0]}`;
        case "limsupb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim sup<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "limsupo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>lim sup</span> ${argStrings[1]}`;
        case "limsupu":
            return `<span\nclass="operator">lim sup<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "lint":
            return `<span\nclass="operator">∮</span> ${argStrings[0]}`;
        case "lintb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∮<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "linto":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∮</span> ${argStrings[1]}`;
        case "lintu":
            return `<span\nclass="operator">∮<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "llint":
            return `<span\nclass="operator">∯</span> ${argStrings[0]}`;
        case "llintb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∯<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "llinto":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∯</span> ${argStrings[1]}`;
        case "llintu":
            return `<span\nclass="operator">∯<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "lllint":
            return `<span\nclass="operator">∰</span> ${argStrings[0]}`;
        case "lllintb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∰<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "lllinto":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∰</span> ${argStrings[1]}`;
        case "lllintu":
            return `<span\nclass="operator">∰<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "logbase":
            return `log<span\nclass="logbase">${argStrings[0]}</span>${argStrings[1]}`;
        case "mgthan":
            return `${argStrings[0]}≫${argStrings[1]}`;
        case "-":
        case "minus":
            return `-${argStrings[0]}`;
        case "mlthan":
            return `${argStrings[0]}≪${argStrings[1]}`;
        case "ndivides":
            return `${argStrings[0]}∤${argStrings[1]}`;
        case "neg":
            return `¬${argStrings[0]}`;
        case "nns":
            return `ℕ`;
        case "noteq":
            return `${argStrings[0]}≠${argStrings[1]}`;
        case "notin":
            return `${argStrings[0]}∉${argStrings[1]}`;
        case "nprec":
            return `${argStrings[0]}⊀${argStrings[1]}`;
        case "nsucc":
            return `${argStrings[0]}⊁${argStrings[1]}`;
        case "nsubset":
            return `${argStrings[0]}⊄${argStrings[1]}`;
        case "nsubsete":
            return `${argStrings[0]}⊈${argStrings[1]}`;
        case "nsupset":
            return `${argStrings[0]}⊅${argStrings[1]}`;
        case "nsupsete":
            return `${argStrings[0]}⊉${argStrings[1]}`;            
        case "owns":
            return `${argStrings[0]}∋${argStrings[1]}`;
        case "or":
            return `${argStrings[0]}<span class="or">∨</span>${argStrings[1]}`;
        case "origof":
            return `${argStrings[0]}⊶${argStrings[1]}`;
        case "ortho":
            return `${argStrings[0]}⟂${argStrings[1]}`;
        case "parallel":
            return `${argStrings[0]}∥${argStrings[1]}`;
        case "+":
        case "plus":
            return `+${argStrings[0]}`;
        case "^":
        case "pow":
            return `${argStrings[0]}<span\nclass="pow">${argStrings[1]}</span>`;
        case "prec":
            return `${argStrings[0]}≺${argStrings[1]}`;
        case "preceq":
            return `${argStrings[0]}≼${argStrings[1]}`;
        case "precsim":
            return `${argStrings[0]}≾${argStrings[1]}`;
        case "\'":
        case "prime":
            return `<span class="prime"> </span>\'`;

        case "prod":
            return `<span\nclass="operator">∏</span> ${argStrings[0]}`;
        case "prodb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∏<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "prodo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∏</span> ${argStrings[1]}`;
        case "produ":
            return `<span\nclass="operator">∏<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "prop":
            return `${argStrings[0]}∝${argStrings[1]}`;
        case "rans":
            return `ℚ`;
        case "rens":
            return `ℝ`;
        case "setm":
            return `${argStrings[0]}\\${argStrings[1]}`;
        case "setq":
            return `${argStrings[0]}/${argStrings[1]}`;
        case "sim":
            return `${argStrings[0]}∼${argStrings[1]}`;
        case "simeq":
            return `${argStrings[0]}≃${argStrings[1]}`;
        case "stimes":
            return `${argStrings[0]}<span class="stimes">*</span>${argStrings[1]}`;
        case "subset":
            return `${argStrings[0]}⊂${argStrings[1]}`;
        case "subsete":
            return `${argStrings[0]}⊆${argStrings[1]}`;
        case "succ":
            return `${argStrings[0]}≻${argStrings[1]}`;
        case "succeq":
            return `${argStrings[0]}≽${argStrings[1]}`;
        case "succsim":
            return `${argStrings[0]}≿${argStrings[1]}`;

        case "sum":
            return `<span\nclass="operator">∑</span> ${argStrings[0]}`;
        case "sumb":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∑<span\nclass="under">${argStrings[1]}</span></span> ${argStrings[2]}`;
        case "sumo":
            return `<span\nclass="operator"><span\nclass="over">${argStrings[0]}</span>∑</span> ${argStrings[1]}`;
        case "sumu":
            return `<span\nclass="operator">∑<span\nclass="under">${argStrings[0]}</span></span> ${argStrings[1]}`;

        case "supset":
            return `${argStrings[0]}⊃${argStrings[1]}`;
        case "supsete":
            return `${argStrings[0]}⊇${argStrings[1]}`;
        case "sqrt":
            return `<span>&radic;<span\nclass="sqrt">${argStrings[0]}</span></span>`;
        case "*":
        case "times":
            return `${argStrings[0]}⋅${argStrings[1]}`;
        case "toward":
            return `${argStrings[0]}➜${argStrings[1]}`;
        case "union":
            return `${argStrings[0]}∪${argStrings[1]}`;
        case "xtimes":
            return `${argStrings[0]}×${argStrings[1]}`;
        default:
            return ``;
    }
}

// Returns string
function processLeftFunction(functionToken, tokensRight){
    let accumulator = [];
    for (let index = 0; index < functionToken[3]; ++index){
        if (index < tokensRight.length){
            accumulator.push(tokensRight[index][1]);
        } else {
            accumulator.push("¿");
        }
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns string
function processMiddleFunction(functionToken, tokenLeft, tokenRight){
    let accumulator = [];
    if (tokenLeft.length > 0){
        accumulator.push(link(parse(tokenLeft[0][1])));
    } else {
        accumulator.push("¿");
    }
    if (tokenRight.length > 0){
        accumulator.push(tokenRight[0][1]);
    } else {
        accumulator.push("¿");
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns string
function processSub(inputToken){
    if (inputToken[1].length < 2){
        return inputstring;
    }
    if (inputToken[1][0] == ";"){
        if (/[;]/.test(inputToken[1][inputToken[1].length - 2]) && inputToken[1][inputToken[1].length - 2] == inputToken[1][inputToken[1].length - 1]){
            return link(parse(inputToken[1].substring(1, inputToken[1].length - 2)));
        } else if (/[;]/.test(inputToken[1][inputToken[1].length - 1])){ // Thanks ChatGPT for the regex!
           return link(parse(inputToken[1].substring(1, inputToken[1].length - 1)));
        } else {
            return link(parse(inputToken[1].substring(1, inputToken[1].length)));
        }
    }
    if (/^[\)\]\}\|]+$/.test(inputToken[1][inputToken[1].length - 1])){ // Thanks ChatGPT for the regex!
        return inputToken[1][0] + link(parse(inputToken[1].substring(1, inputToken[1].length - 1))) + inputToken[1][inputToken[1].length - 1];
    }
    return inputToken[1][0] + link(parse(inputToken[1].substring(1, inputToken[1].length)));
}

// ChatGPT aided
// Returns string
function processGroup(inputToken) {
    let result = "";
    for (let i = 0; i < inputToken[1].length; i++) {
        const char = inputToken[1][i];
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

function parse(segmentString){
    let tokens              = [];
    let currentFuncStart    = -1;
    let currentGroupStart   = -1;
    let currentSubStart     = -1;
    let semicolSegments     = 0;
    let shownSegments       = 0;
    let isFunction          = [-1, -1];
    let currentChar         = "";

    for (let index = 0; index < segmentString.length; ++index){
        currentChar = segmentString[index];
        if (isAlpha(currentChar) && (shownSegments + semicolSegments == 0)){
            if (currentGroupStart == -1){ currentGroupStart = index; }
            if (currentFuncStart == -1){ 
                currentFuncStart = index; 
            } else {
                isFunction = functionPositionAndInputs(segmentString.substring(currentFuncStart, index + 1));
                if (isFunction[1] != -1){
                    if (currentGroupStart != currentFuncStart){
                        tokens.push([2, segmentString.substring(currentGroupStart, currentFuncStart)]);
                    }
                    if (index + 1 == segmentString.length){
                        tokens.push([0, segmentString.substring(currentFuncStart, index + 1), isFunction[0], isFunction[1]]);
                        currentGroupStart = -1;
                        continue;
                    }
                    if (!isAlpha(segmentString[index + 1])){
                        tokens.push([0, segmentString.substring(currentFuncStart, index + 1), isFunction[0], isFunction[1]]);
                        currentGroupStart = -1;
                    }
                }
            }
            continue;
        }
        switch (currentChar) {

        case " ":
            if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){
                tokens.push([2, segmentString.substring(currentGroupStart, index)]);
                currentGroupStart = -1;
            }
            currentFuncStart = -1;
            continue;
        case "(":
        case "[":
        case "{":
            if ((currentGroupStart != -1) && (shownSegments + semicolSegments == 0)){ 
                tokens.push([2, segmentString.substring(currentGroupStart, index)]);
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
                    tokens.push([1, segmentString.substring(currentSubStart, index + 1)]);
                    currentSubStart   = -1;
                    currentGroupStart = -1;
                }
            }
            continue;
        case ";":
            if (index + 1 < segmentString.length){
                if (segmentString[index + 1] == ";"){
                    if (semicolSegments == 1){
                        tokens.push([1, segmentString.substring(currentSubStart, index + 2)]);
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
                        tokens.push([2, segmentString.substring(currentGroupStart, index)]);
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
                    tokens.push([2, segmentString.substring(currentGroupStart, index)]);
                }
                currentGroupStart = -1;
                tokens.push([0, segmentString.substring(index, index + 1), isFunction[0], isFunction[1]]);
            } else if ((currentGroupStart == -1) && (shownSegments + semicolSegments == 0)) {
                currentGroupStart = index;
            }
            continue;
        }
    }
    if (currentSubStart != -1){ 
        tokens.push([1, segmentString.substring(currentSubStart, segmentString.length)]);
    } else if (currentGroupStart != -1){ 
        tokens.push([2, segmentString.substring(currentGroupStart, segmentString.length)]);
    }

    return tokens;
}

// Returns string
function link(tokens){
    for (let index = tokens.length - 1; index >= 0; --index){
        if (tokens[index][0] == 0){
            if (tokens[index][2] == 0){
                tokens[index][1] = processLeftFunction(tokens[index], tokens.slice(index + 1, index + 1 + tokens[index][3]))
                tokens.splice(index + 1, Math.min(tokens.length - index, tokens[index][3]));
            } else {
                tokens[index][1] = processMiddleFunction(tokens[index], tokens.slice(index - 1, index), tokens.slice(index + 1, index + 2));
                tokens.splice(index + 1, 1);
                tokens.splice(index - 1, 1);
                --index;
            }
        } else if (tokens[index][0] == 1){
            tokens[index][1] = processSub(tokens[index]);
            if (index - 1 == -1){
                continue;
            } 
            if (tokens[index - 1][0] == 2){
                tokens[index - 1][1] = processGroup(tokens[index - 1]) + tokens[index][1];
                tokens.splice(index, 1);
                --index;
            }
        } else {
            tokens[index][1] = processGroup(tokens[index]);
        }
    }

    let output = "";
    for (let index = 0; index < tokens.length; ++index){
        output += tokens[index][1];
        if (index + 1 == tokens.length){
            continue;
        }
        if ((tokens[index][0] == tokens[index + 1][0]) && (tokens[index][0] == 2)){
            output += " ";
        }
    }

    return output;
}


// EVENT TRIGGERS START
function onEvent(inputElement) {
    let segments = [];
    let endStartIndex = -1;
    let userInput = inputElement.value
        .replace("\n", " ")
        .replace("+-", "±")
        .replace("-+", "∓");
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
        outputElement.innerHTML += `<div class="segment">${link(parse(segment))}</div>`;
    }
    inputElement.setAttribute("data", outputElement.innerHTML);
}

function generateID(IDString){
    if (IDString.length == 0){
        return [String(Math.trunc(Math.random() * 1000000000)), false];
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

function printOutput(){
    window.print();
}

function updateName(event){
    let newID = generateID(event.srcElement.value);
    document.getElementById(event.srcElement.getAttribute("data")).setAttribute("showID", String(newID[1]));
    document.getElementById(event.srcElement.getAttribute("data")).id = newID[0];
    for (let index = 0; index < event.srcElement.parentNode.childNodes.length; ++index) {
        event.srcElement.parentNode.childNodes[index].setAttribute("data", newID[0]);
    };
    updateBaseOutput();
}

function moveInputUp(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let previousElement = event.srcElement.parentNode.previousSibling;
    if (previousElement){
        event.srcElement.parentNode.parentNode.insertBefore(event.srcElement.parentNode, previousElement);
        inputElement.parentNode.insertBefore(inputElement, inputElement.previousSibling);
    }
    updateBaseOutput();
}

function moveInputDown(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let nextElement = event.srcElement.parentNode.nextSibling;
    if (nextElement){
        event.srcElement.parentNode.parentNode.insertBefore(nextElement, event.srcElement.parentNode);
        inputElement.parentNode.insertBefore(inputElement.nextSibling, inputElement);
    }
    updateBaseOutput();
}

function copyInput(event){
    let inputElement = document.getElementById(event.srcElement.getAttribute("data"));
    let newID = generateID(event.srcElement.getAttribute("data"));
    inputElement.insertAdjacentElement("afterend", newInputElement(newID[0], newID[1]));
    document.getElementById(newID[0]).setAttribute("data", inputElement.getAttribute("data"));
    document.getElementById(newID[0]).value = inputElement.value;
    document.getElementById(newID[0]).setAttribute("showID", inputElement.getAttribute("showID"));
    event.srcElement.parentNode.insertAdjacentElement("afterend", newProblemTableRow(newID[0], inputElement.getAttribute("showID") == "true"));
    document.getElementById("problemList").lastChild.scrollIntoView();
    updateBaseOutput();
}

function deleteInput(event){
    event.srcElement.parentNode.remove();
    document.getElementById(event.srcElement.getAttribute("data")).remove();
    updateBaseOutput();
}

function editInput(event){
    document.getElementById("baseForm").hidden = true;
    document.getElementById("problemList").hidden = true;
    document.getElementById("backToBase").hidden = false;
    document.getElementById("backToBase").setAttribute("data", event.srcElement.getAttribute("data"));
    document.getElementById(event.srcElement.getAttribute("data")).hidden = false;
    document.getElementById(event.srcElement.getAttribute("data")).focus();
    document.getElementById("output").innerHTML = document.getElementById(event.srcElement.getAttribute("data")).getAttribute("data");
}

function backToBase(event){
    document.getElementById("baseForm").hidden = false;
    document.getElementById("problemList").hidden = false;
    document.getElementById("backToBase").hidden = true;
    document.getElementById(event.srcElement.getAttribute("data")).hidden = true;
    updateBaseOutput();
}

function newInputElement(id, showID){
    let newInput = document.createElement("textarea");
    newInput.className = "input";
    newInput.id = id;
    newInput.addEventListener("input", function(){onEvent(this);});
    newInput.setAttribute("data", "");
    newInput.setAttribute("showID", String(showID));
    newInput.hidden = true;
    return newInput;
}

function newProblemTableRow(inputID, visibleID){
    let rowDiv = document.createElement("div");
    rowDiv.className = "problemListRow"
    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.className = "problemName";
    if (visibleID){
        nameInput.value = inputID;
    }
    nameInput.setAttribute("data", inputID);
    nameInput.addEventListener("input", updateName);
    let moveUp = document.createElement("button");
    moveUp.className = "editProblem";
    moveUp.textContent = "Move Up";
    moveUp.setAttribute("data", inputID);
    moveUp.addEventListener("click", moveInputUp);
    let moveDown = document.createElement("button");
    moveDown.className = "editProblem";
    moveDown.textContent = "Move Down";
    moveDown.setAttribute("data", inputID);
    moveDown.addEventListener("click", moveInputDown);
    let copy = document.createElement("button");
    copy.className = "editProblem";
    copy.textContent = "Copy";
    copy.setAttribute("data", inputID);
    copy.addEventListener("click", copyInput);
    let remove = document.createElement("button");
    remove.className = "editProblem";
    remove.textContent = "Delete";
    remove.setAttribute("data", inputID);
    remove.addEventListener("click", deleteInput);
    let edit = document.createElement("button");
    edit.className = "editProblem";
    edit.textContent = "Edit";
    edit.setAttribute("data", inputID);
    edit.addEventListener("click", editInput);

    rowDiv.append(nameInput, moveUp, moveDown, copy, remove, edit);

    return rowDiv;
}

function addNewInput(){
    let problemNameInput = document.getElementById("baseForm").children[0];
    let problemList = document.getElementById("problemList");
    let ID = generateID(problemNameInput.value);
    document.getElementById("inputs").append(newInputElement(ID[0], ID[1]));
    problemList.append(newProblemTableRow(ID[0], ID[1]));
    problemNameInput.value = "";
    problemList.lastChild.scrollIntoView();
    updateBaseOutput();
}

function updateBaseOutput(){
    let outputElement = document.getElementById("output");
    outputElement.innerHTML = "";
    const inputElements = document.getElementsByClassName("input");
    for (let index = 0; index < inputElements.length; ++index){
        let problem = document.createElement("div");
        problem.className = "baseOutput";
        let label = document.createElement("span");
        if (inputElements[index].getAttribute("showID") == "true"){
            label.innerText = inputElements[index].id + ".";
        }
        label.className = "baseOutputLabel";
        let contents = document.createElement("div");
        contents.innerHTML = inputElements[index].getAttribute("data");
        contents.className = "baseOutputContents";
        problem.append(label, contents);
        outputElement.append(problem);
        if (index == inputElements.length - 1){
            contents.scrollIntoView();
        }
    }
}

function windowLeave(event){
    event.preventDefault();
    return "";
}