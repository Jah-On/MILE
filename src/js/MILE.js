import * as problem from "./problem/ui.js";
import * as project from "./project/ui.js";
import * as storage from "./storage/util.js";
import * as keyInput from "./input/key.js";
import { EditorView, gutter, lineNumbers, placeholder } from "@codemirror/view";
import { EditorState, Line } from "@codemirror/state";
import { minimalSetup } from "codemirror";
import {
	autocompletion,
	closeBrackets,
	completeFromList,
	snippetCompletion,
} from "@codemirror/autocomplete";
import { autoCompleteList } from "./text-suggestion/constants.js";

// Main entry point
// window.addEventListener("beforeunload", windowLeave);
window.addEventListener("load", () => {
	project.loadAll();
	document
		.getElementById("addProject")
		.addEventListener("click", project.add);
	document
		.getElementById("closeRevisions")
		.addEventListener("click", project.closeRevisions);
	document
		.getElementById("backButton")
		.addEventListener("click", problem.backToHome);
	document
		.getElementById("importButton")
		.addEventListener("click", storage.upload);
	document
		.getElementById("exportButton")
		.addEventListener("click", storage.download);
	document.getElementById("printButton").addEventListener("click", () => {
		window.print();
	});
	document.getElementById("addNew").addEventListener("click", () => {
		problem.add("");
	});
	let inputElement = document.getElementById("inputArea");
	inputElement.data = new EditorView({
		parent: inputElement,
		state: EditorState.create({
			extensions: [
				minimalSetup,
				closeBrackets(),
				lineNumbers(),
				placeholder(
					"Enter AsciiMath or alternate names here...\nYou can press the <Tab> key to hop to the next component for functions like fraction!",
				),
				autocompletion({
					override: [completeFromList(autoCompleteList)],
				}),
				EditorView.lineWrapping,
				EditorView.theme(
					{
						".cm-content": {
							caretColor: "whitesmoke",
						},
					},
					{ dark: true },
				),
				EditorView.updateListener.of(keyInput.handleInput),
			],
		}),
	});
});
