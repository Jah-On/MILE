import { asciimath } from "./ASCIIMathML";
import { fragmentMap } from "../storage/util";

export function render(id, data) {
	const resNode = fragmentMap.get(id);
	const lines = data.split(/\n/);

	const results = lines.map(asciimath.parseMath);

	resNode.replaceChildren(...results);
}

export function renderProblem(data) {
	const queryString = window.location.search;
	const urlParams   = new URLSearchParams(queryString);
	const problemID   = urlParams.get("id");

	render(problemID, data);

	let output = document.getElementById("output");
	output.replaceChildren(fragmentMap.get(problemID).cloneNode(true));
}
