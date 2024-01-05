import { asciiMathMap, asciiMathRegex, markInMap, markInRegex
} from "./constants";

// var inMarkIn = true;

// const mapMap = new Map([
//     [true, markInMap],
//     [false, asciiMathMap]
// ]);

// const regexMap = new Map([
//     [true, markInRegex],
//     [false, asciiMathRegex]
// ]);

export function showSuggestion() {
    let selected    = window.getSelection();
    let focusedNode = selected.focusNode;
    if (!focusedNode.data) { return; }

    let range       = selected.getRangeAt(0);
    let offset      = range.startOffset;
    let slice       = focusedNode.data.slice(0, offset);
    let nonAlpha    = slice.match(/`|[^aA-zZ]/g);
    let lastIndex;
    if (!nonAlpha) {
        lastIndex = 0;
    } else {
        lastIndex = slice.lastIndexOf(nonAlpha[nonAlpha.length - 1]) + 1;
    }

    let last = slice.slice(lastIndex);

    if (last.length < 1) {
        return;
    }
    for (const key of asciiMathMap.keys()) {
        if (!key.startsWith(last)) {
            continue;
        }
        let suggestion             = document.createElement("span");
        suggestion.id              = "suggestion";
        suggestion.innerText       = key.slice(last.length);
        suggestion.contentEditable = false;
        suggestion.tabIndex        = 0;
        suggestion.match           = key;
        suggestion.pm              = last; // partial match
        suggestion.addEventListener("focus", suggestionFocus);
    
        focusedNode.splitText(offset).previousSibling.after(suggestion);

        break;
    }
}

export function removeSuggestion(){
    let suggestion = document.getElementById("suggestion");
    if (suggestion) { suggestion.remove(); }
}

function suggestionFocus(event) {
    let range  = window.getSelection().getRangeAt(0);
    let parent = event.target.parentNode;
    let target = event.target;
    let text   = target.previousSibling;
    let match  = target.match;
    let pm     = target.pm; // partial match
    let result = asciiMathMap.get(match);

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