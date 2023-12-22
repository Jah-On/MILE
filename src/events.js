import { exportToJSON, localDownloader } from "./helper.js"
import { fragmentMap }   from "./js/problem/ui.js";
import { importToLocal } from "./js/project/util.js";
// import mathup      from "mathup";

export function updateOutput(){
    let   inputArea = document.getElementById("inputArea");
    const uuid      = inputArea.getAttribute("uuid");
    let   fragment  = fragmentMap.get(uuid);

    // let res = mathup(inputArea.innerText, {});
    // console.log(res);
    let temp        = document.createElement("template");
    
    fragment.replaceChildren(temp.content);
    // for (const element of preProcess(inputArea.innerText)) {
    //     fragmentMap.get(
    //         inputArea.getAttribute("uuid")
    //     ).append(document.createElementNS(MLNameSpace, "math"));
    //     fragmentMap.get(
    //         inputArea.getAttribute("uuid")
    //     ).lastChild.append(element);
    //     fragmentMap.get(
    //         inputArea.getAttribute("uuid")
    //     ).append(document.createElement("br"));
    // }

    document.getElementById("output").replaceChildren(
        fragmentMap.get(
            inputArea.getAttribute("uuid")
        ).cloneNode(true)
    );
}

export function exportMIL(){
    let name = document.getElementById("project").getAttribute("data-name");
    localDownloader(
        name + ".mil",
        exportToJSON(),
        "text/plain"
    );
}

export function importMIL(){
    let fileElement = document.createElement("input");
    fileElement.id = "invisibleFileElement";
    fileElement.type = "file";
    fileElement.addEventListener("input", handleMILFile);
    fileElement.click();
}

function handleMILFile(event){
    let fileIOHandle = new FileReader;
    if (event.target.files[0].name.slice(-4) != ".mil") {
        window.alert("Invalid file type.");
        return;
    }
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", (e) => {
        importToLocal(e, event.target.files[0].name.slice(0, -4));
    });
}