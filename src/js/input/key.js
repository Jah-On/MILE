import * as nextText     from '../text-suggestion/nextText.js';
import { renderProblem } from '../output/ui.js';
import { saveRowData }   from '../problem/ui.js';


const closeBracket = {
    "(": ")",
    "[": "]",
    "{": "}"
};

export function handleKeyDown(e) {
    switch (e.key) {
    case "Tab":
        let suggestion = document.getElementById("suggestion");
        if (suggestion) {
            e.preventDefault();
            e.stopPropagation();
            suggestion.focus();
            saveRowData();
            renderProblem();
        }
        break;
    case "(":
    case "[":
    case "{":
        e.preventDefault();
        e.stopPropagation();
        nextText.removeSuggestion();
        handleBracket(e.key);
        saveRowData();
        renderProblem();
        break;
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
        return;
    default:
        nextText.removeSuggestion();
        renderProblem();
        return;
    }
}

export function handleInput(e) {
    nextText.removeSuggestion();
    saveRowData();
    renderProblem();
    nextText.showSuggestion();
}

function handleBracket(key){
    let input    = document.getElementById("inputArea");
    input.normalize();

    let selected  = window.getSelection();
    let range     = selected.getRangeAt(0);
    let start     = range.startOffset;
    let end       = range.endOffset;
    let startNode = range.startContainer;
    let endNode   = range.endContainer;
    if (endNode == input){
        input.childNodes[end].before(closeBracket[key]);
    } else {
        endNode.insertData(end, closeBracket[key]);
    }
    if (startNode == input){
        input.childNodes[start].before(key);
    } else {
        startNode.insertData(start, key);
    }
    end += (startNode == endNode)|0;
    range.setStart(startNode, start + 1);
    range.setEnd(endNode, end);
}