export function exportToJSON(){
    let outputData = [];
    let problems = [...document.getElementsByClassName("problem")];
    for (const problem of problems){
        outputData.push(
            {
                displayName: problem.children[0].value||"",
                src:         problem.getAttribute("src"),
            }
        );
    }
    return JSON.stringify(outputData);
}

export function localDownloader(name="", data="", MIME="") {
    let downloadLink = document.createElement("a");
    downloadLink.download = name;
    let blobby = new Blob([data], {type:MIME});
    let downloadURL = window.URL.createObjectURL(blobby);
    downloadLink.href = downloadURL;
    downloadLink.click();
}