import { isAlpha } from "./helper.js"
import { link } from "./htmlGen.js"
import { parse } from "./parser.js"

export function onEvent(inputElement) {
    inputElement.setAttribute("value", inputElement.value);
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
            (endStartIndex != -1 &&
            !isAlpha(userInput[index]) &&
            (index - endStartIndex) % 4 == 3
        ) {
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

    for (let index = 0; index < segments.length; ++index) {
        outputElement.append(link(parse(segments[index])));
        outputElement.lastChild.className = "segment";
    }
    // console.log(document.getElementsByClassName("operationInput")[0].clientHeight);

    let visibleFronts = document.getElementsByClassName("visibleFront");
    for (let index = 0; index < visibleFronts.length; ++index) {
        visibleFronts[index].style.transform = `scaleY(${visibleFronts[index].nextSibling.clientHeight / visibleFronts[index].clientHeight}`;
    }

    let visibleBacks = document.getElementsByClassName("visibleBack");
    for (let index = 0; index < visibleBacks.length; ++index) {
        visibleBacks[index].style.transform = `scaleY(${visibleBacks[index].previousSibling.clientHeight / visibleBacks[index].clientHeight}`;
    }

    inputElement.setAttribute("data", outputElement.innerHTML);
}

export function pageSave(event) {
    if ((event.keyCode == 83) && event.ctrlKey){
        event.preventDefault();
        let downloadLink = document.createElement("a");
        downloadLink.download = "MILE_AIO.html";
        let blobby = new Blob([document.documentElement.innerHTML], {type:"text/html"});
        let downloadURL = window.URL.createObjectURL(blobby);
        downloadLink.href = downloadURL;
        downloadLink.click();
        return;
    }
    
}

export function printOutput() {
    window.print();
}

export function windowLeave(event) {
    event.preventDefault();
    return "";
}
