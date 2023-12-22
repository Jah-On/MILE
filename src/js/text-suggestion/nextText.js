import { asciiMathMap, asciiMathRegex, markInMap, markInRegex
} from "./constants";

var inMarkIn = true;

const mapMap = new Map([
    [true, markInMap],
    [false, asciiMathMap]
]);

const regexMap = new Map([
    [true, markInRegex],
    [false, asciiMathRegex]
]);

export function onTextInput(event) {
    if (event.data == null) { return; }
    let inputArea  = document.getElementById("inputArea");
    let map        = mapMap.get(
        (inputArea.innerText.match(/`/g) || []).length % 2 == 0
    );
    let alphaInput = /[aA-zZ]/.test(event.data);

    let suggestion = document.getElementById("suggestion");
    if (suggestion) { suggestion.remove(); }

    let selected    = window.getSelection();
    let focusedNode = selected.focusNode;
    if (!focusedNode) { return; }

    let range    = selected.getRangeAt(0);
    let offset   = range.startOffset;
    let slice    = focusedNode.data.slice(0, offset);
    let nonAlpha = slice.match(/`|[^aA-zZ]/g);
    let lastIndex;
    if (nonAlpha == null) {
        lastIndex = 0;
    } else {
        lastIndex = slice.lastIndexOf(nonAlpha[nonAlpha.length - 1]) + 1;
    }

    let last = slice.slice(lastIndex);
    // updateOutput();

    if ((last.length < 1) || !alphaInput) {
        return;
    }
    for (const key of map.keys()) {
        if (!key.startsWith(last)) {
            continue;
        }
        suggestion = document.createElement("span");
        suggestion.id = "suggestion";
        suggestion.innerText = key.slice(last.length);
        suggestion.contentEditable = false;
        suggestion.tabIndex = 0;
        suggestion.match = key;
        suggestion.pm    = last; // partial match
        suggestion.map   = map;
        suggestion.addEventListener("focus", suggestionFocus);
    
        event.target.append(suggestion);
        event.target.insertBefore(suggestion, focusedNode.splitText(offset));

        break;
    }
}

function suggestionFocus(event) {
    let range  = window.getSelection().getRangeAt(0);
    let parent = event.target.parentNode;
    let target = event.target;
    let text   = target.previousSibling;
    let match  = target.match;
    let pm     = target.pm; // partial match
    let map    = target.map;
    let result = map.get(match);

    event.target.remove();
    text.replaceData(
        text.length - pm.length, 
        match.length, 
        result[0]
    );
    range.setStart(text, text.length - result[1]);
    parent.focus();

    // updateOutput();
}