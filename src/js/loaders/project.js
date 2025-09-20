import * as ui from "../project/ui.js";
import * as storage from "../storage/util.js"

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);

window.addEventListener("load", () => {
    let id = urlParams.get("id");

    let start = performance.now();
    let projectData = storage.load(id);
    // console.log(projectData);

	// console.log(end - start);

    ui.loadAll(projectData);
    let end   = performance.now();

    console.log(end - start);

    document
        .getElementById("backButton")
        .addEventListener("click", ui.goBack);
    document.getElementById("addNew").addEventListener("click", () => {
		ui.add("");
	});
});
