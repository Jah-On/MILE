import * as projects from "../projects/ui.js";
import * as storage from "../storage/util.js";

// Main entry point
// window.addEventListener("beforeunload", windowLeave);
window.addEventListener("load", () => {
	projects.loadAll();
	document
		.getElementById("addProject")
		.addEventListener("click", projects.add);
	document
		.getElementById("closeRevisions")
		.addEventListener("click", projects.closeRevisions);
	document
		.getElementById("importButton")
		.addEventListener("click", storage.upload);

	window.name = 1;
});
