import { renderProblem } from "../output/ui.js";
import { saveRowData } from "../project/ui.js";

export function handleInput(updatedView) {
	// if (updatedView.focusChanged) {
	// 	let input = document.getElementById("inputArea");
	// 	let UUID = input.getAttribute("UUID");
	// 	let row = document.getElementById(UUID);

	// 	updatedView.state.update({
	// 		changes: {
	// 			from: 0,
	// 			to: updatedView.state.doc.length,
	// 			insert: row.data,
	// 		},
	// 	});
	// }

	if (!updatedView.docChanged) return;

	let content = updatedView.state.sliceDoc();

	renderProblem(content);
	// saveRowData(content);
}
