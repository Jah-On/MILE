import * as ui from "../project/ui.js";
import * as storage from "../storage/util.js"

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const id          = urlParams.get("id");

window.addEventListener("load", () => {
    let start       = performance.now();
    let projectData = JSON.parse(storage.load(id));

    ui.loadAll(projectData);

    let end   = performance.now();

    document
        .getElementById("backButton")
        .addEventListener("click", ui.goBack);
    document
        .getElementById("exportButton")
        .addEventListener("click", storage.download);
    document.getElementById("addNew").addEventListener("click", () => {
		ui.add(crypto.randomUUID(), "");
	});
});

window.addEventListener("beforeunload", () => {
        storage.save(id)
    }
)