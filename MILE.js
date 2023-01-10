const functionToChar = {"aleph":"ℵ", "and":"^", "approx":"≈", "cdot":"⊙", 
                        "copen":"◯", "coprod":"∐", "cminus":"⊖", "cns":"ℂ", 
                        "cplus":"⊕", "cslash":"⊘", "ctimes":"⊗", "def":"≝", 
                        "/":"/", "div":"÷", "|":"∣", "divides":"∣", 
                        "dlarrow":"⇐", "dlrarrow":"⇔", "drarrow":"⇒", 
                        "=":"=", "equals":"=", "equiv":"≡", "ens":"∅", 
                        ">":">", "gthan":">", "gethan":"≥", "geslant":"⩾", 
                        "in":"∈", "infinity":"∞", "imgof":"⊷", "ins":"ℤ", 
                        "int":"∫", "iint":"∬", "iiint":"∭", "intersect":"∩", 
                        "<":"<", "lthan":"<", "lethan":"≤", "leslant":"⩽", 
                        "lim":"lim", "liminf":"lim inf", "limsup":"lim sup", 
                        "lint":"∮", "llint":"∯", "lllint":"∰", "mgthan":"≫", 
                        "-":"—", "minus":"—", "mlthan":"≪", "ndivides":"∤", 
                        "neg":"¬", "nns":"ℕ", "noteq":"≠", "notin":"∉", 
                        "nprec":"⊀", "nsucc":"⊁", "nsubset":"⊄", 
                        "nsubsete":"⊈", "nsupset":"⊅", "nsupsete":"⊉", 
                        "owns":"∋", "or":"∨", "origof":"⊶", "ortho":"⟂", 
                        "parallel":"∥", "+":"+", "plus":"+", "prec":"≺", 
                        "preceq":"≼", "precsim":"≾", "\'":"'", "prime":"'",
                        "prod":"∏", "prop":"∝", "rans":"ℚ", "rens":"ℝ", 
                        "setm":"\\", "setq":"/", "sim":"∼", "simeq":"≃", 
                        "stimes":"*", "subset":"⊂", "subsete":"⊆", "succ":"≻", 
                        "succeq":"≽", "succsim":"≿", "sum":"∑", "supset":"⊃", 
                        "supsete":"⊇", "*":"⋅", "times":"⋅", "toward":"➜", 
                        "union":"∪", "xtimes":"×"};

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
        case "mgthan":
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
// Returns element
function functionToHTML(funcName, argElements){
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
    let outputElement = document.createElement("span");
    switch (funcName) {
        case "abs":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.innerText = "|";
            outputElement.append(argElements[0]);
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.innerText = "|";
            return outputElement;

        case "frac":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "frac";
            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.append(argElements[0]);
            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.className = "denominator";
            outputElement.lastChild.lastChild.append(argElements[1]);
            return outputElement;    

        case "logbase":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.innerText = "log";
            outputElement.append(argElements[0]);
            outputElement.lastChild.className = funcName;
            outputElement.append(argElements[1]);
            return outputElement;
    
        case "pow":
            outputElement.append(argElements[0]);
            outputElement.append(argElements[1]);
            outputElement.lastChild.className = funcName;
            return outputElement;

        case "sqrt":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.innerText = "√";
            outputElement.append(argElements[0]);
            outputElement.lastChild.className = funcName;
            return outputElement;

        case "aleph":
        case "ens":
        case "infinity":
        case "ins":
        case "nns":
        case "prime":
        case "rans":
        case "rens":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = funcName;
            outputElement.lastChild.innerText = functionToChar[funcName];
            return outputElement;

        case "minus":
        case "neg":
        case "plus":
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = funcName;
            outputElement.lastChild.innerText = functionToChar[funcName];
            outputElement.append(argElements[0]);
            return outputElement;

        case "and":
        case "approx":
        case "cdot":
        case "copen":
        case "cminus":
        case "cns":
        case "cplus":
        case "cslash":
        case "ctimes":
        case "def":
        case "/":
        case "div":
        case "divides": 
        case "dlarrow": 
        case "dlrarrow": 
        case "drarrow": 
        case "equals": 
        case "equiv": 
        case "gthan":
        case "gethan":
        case "geslant":
        case "in":
        case "imgof":
        case "intersect":
        case "lthan":
        case "lethan":
        case "leslant":
        case "mgthan":
        case "mlthan":
        case "ndivides":
        case "noteq":
        case "notin":
        case "nprec":
        case "nsucc":
        case "nsubset":
        case "nsubsete":
        case "nsupset":
        case "nsupsete":
        case "owns":
        case "or":
        case "origof":
        case "ortho":
        case "parallel":
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
        case "times":
        case "toward":
        case "union":
        case "xtimes":
            outputElement.append(argElements[0]);
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = funcName;
            outputElement.lastChild.innerText = functionToChar[funcName];
            outputElement.append(argElements[1]);
            return outputElement;
        
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
        case "prod":
        case "sum":
            ID = generateRand16();
            outputElement.append(document.createElement("span"));
            outputElement.lastChild.ID = ID;
            outputElement.lastChild.className = funcName;
            outputElement.lastChild.innerText = functionToChar[funcName];
            outputElement.append(argElements[0]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;

        case "coprodo":
        case "into":
        case "iinto":
        case "iiinto":
        case "limo":
        case "liminfo":
        case "limsupo":
        case "linto":
        case "llinto":
        case "lllinto":
        case "prodo":
        case "sumo":
            ID = generateRand16();

            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "over";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = functionToChar[funcName.substr(0, funcName.length - 1)];

            outputElement.append(argElements[1]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;

        case "coprodu":
        case "intu":
        case "iintu":
        case "iiintu":
        case "limu":
        case "liminfu":
        case "limsupu":
        case "lintu":
        case "llintu":
        case "lllintu":
        case "produ":
        case "sumu":
            ID = generateRand16();

            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = functionToChar[funcName.substr(0, funcName.length - 1)];

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "under";

            outputElement.append(argElements[1]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;

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
            ID = generateRand16();

            outputElement.append(document.createElement("span"));
            outputElement.lastChild.className = "operator";

            outputElement.lastChild.append(argElements[0]);
            outputElement.lastChild.lastChild.className = "over";

            outputElement.lastChild.append(document.createElement("span"));
            outputElement.lastChild.lastChild.id = ID;
            outputElement.lastChild.lastChild.className = funcName.substr(0, funcName.length - 1);
            outputElement.lastChild.lastChild.innerText = functionToChar[funcName.substr(0, funcName.length - 1)];

            outputElement.lastChild.append(argElements[1]);
            outputElement.lastChild.lastChild.className = "under";

            outputElement.append(argElements[2]);
            outputElement.lastChild.className = "operationInput";
            outputElement.lastChild.setAttribute("data", ID);
            return outputElement;

        default:
            return outputElement;
    }
}

// Returns element
function processLeftFunction(functionToken, tokensRight){
    let accumulator = [];
    for (let index = 0; index < functionToken[3]; ++index){
        if (index < tokensRight.length){
            accumulator.push(tokensRight[index][1]);
        } else {
            accumulator.push(document.createElement("span"));
            accumulator[accumulator.length - 1].innerText = "¿";
        }
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns element
function processMiddleFunction(functionToken, tokenLeft, tokenRight){
    let accumulator = [];
    if (tokenLeft.length > 0){
        accumulator.push(link(parse(tokenLeft[0][1])));
    } else {
        accumulator.push(document.createElement("span"));
        accumulator[accumulator.length - 1].innerText = "¿";
    }
    if (tokenRight.length > 0){
        accumulator.push(tokenRight[0][1]);
    } else {
        accumulator.push(document.createElement("span"));
        accumulator[accumulator.length - 1].innerText = "¿";
    }
    return functionToHTML(functionToken[1], accumulator);
}

// Returns element
function processSub(inputToken){
    if (inputToken[1].length < 2){
        return processGroup(inputToken);
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
    let endsWithVisible = /^[\)\]\}\|]+$/.test(inputToken[1][inputToken[1].length - 1]); // Thanks ChatGPT for the regex!
    let outputElement = document.createElement("span");

    outputElement.append(document.createElement("span"));
    outputElement.lastChild.className = "visibleFront";
    outputElement.lastChild.innerText = inputToken[1][0];

    outputElement.append(link(parse(inputToken[1].substring(1, inputToken[1].length - Number(endsWithVisible)))));

    if (endsWithVisible){
        outputElement.append(document.createElement("span"));
        outputElement.lastChild.className = "visibleBack";
        outputElement.lastChild.innerText = inputToken[1][inputToken[1].length - 1];
    }
    return outputElement;
}

// ChatGPT aided
// Returns element
function processGroup(inputToken) {
    let outputElement = document.createElement("span");
    for (let i = 0; i < inputToken[1].length; i++) {
        const char = inputToken[1][i];
        if (!isAlpha(char)) {
            outputElement.innerText += char;
        } else {
            outputElement.append(document.createElement("i"));
            outputElement.lastChild.innerText = char;
            if (char == "f"){
                outputElement.append(document.createElement("span"));
                outputElement.lastChild.className = char;
                outputElement.lastChild.innerHTML = "&nbsp;";
            }
        }
    }
    return outputElement;
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

// Returns element
function link(tokens){
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


// EVENT TRIGGERS START
function onEvent(inputElement) {
    let segments = [];
    let endStartIndex = -1;
    let userInput = inputElement.value
        .replaceAll("\n", " ")
        .replaceAll("+-", "±")
        .replaceAll("-+", "∓");
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
        outputElement.append(link(parse(segment)));
        outputElement.lastChild.className = "segment";
    }
    // console.log(document.getElementsByClassName("operationInput")[0].clientHeight);

    let visibleFronts = document.getElementsByClassName("visibleFront");
    for (let index = 0; index < visibleFronts.length; ++index) {
        visibleFronts[index].style.transform = `scaleY(${visibleFronts[index].nextSibling.clientHeight / visibleFronts[index].clientHeight}`;
    };

    let visibleBacks = document.getElementsByClassName("visibleBack");
    for (let index = 0; index < visibleBacks.length; ++index) {
        visibleBacks[index].style.transform = `scaleY(${visibleBacks[index].previousSibling.clientHeight / visibleBacks[index].clientHeight}`;
    };

    inputElement.setAttribute("data", outputElement.innerHTML);
}

function generateRand16(){
    let returnString = "";
    for (let index = 0; index < 16; ++index){
        returnString = returnString + String.fromCharCode(
            Math.random() * 10 + 48
        );
    }
    return returnString;
}

function generateID(IDString){
    if (IDString.length == 0){
        return [generateRand16(), false];
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