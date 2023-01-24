import {isAlpha} from "./helper.js"
import {link} from "./htmlGen.js"
import {parse} from "./parser.js"

export function onEvent(inputElement) {
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

    for (let index = 0; index < segments.length; ++index){
        outputElement.append(link(parse(segments[index])));
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

    let fractions = document.getElementsByClassName("frac");
    for (let index = fractions.length - 1; index >= 0; --index) {
        // console.log(fractions[index].parentNode.previousSibling.getBoundingClientRect());
        console.log((fractions[index].getBoundingClientRect().bottom - fractions[index].parentNode.previousSibling.getBoundingClientRect().bottom) / 2);
        fractions[index].style.marginBottom = `${(fractions[index].getBoundingClientRect().bottom - fractions[index].parentNode.previousSibling.getBoundingClientRect().bottom) / 2}px`;
        // if (fractions[index].childNodes[0].clientHeight > fractions[index].childNodes[1].clientHeight){
        //     fractions[index].style.bottom = `${(fractions[index].childNodes[0].clientHeight / fractions[index].childNodes[1].clientHeight) * (fractions[index].clientHeight / 9)}px`;
        // }
        // else if (fractions[index].childNodes[0].clientHeight < fractions[index].childNodes[1].clientHeight){
        //     fractions[index].style.marginTop = `${(fractions[index].childNodes[1].clientHeight / fractions[index].childNodes[0].clientHeight) * (fractions[index].clientHeight / 9)}px`;
        // }
    };

    inputElement.setAttribute("data", outputElement.innerHTML);
}

export function printOutput(){
    window.print();
}

export function windowLeave(event){
    event.preventDefault();
    return "";
}
