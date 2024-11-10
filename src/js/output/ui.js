import { asciimath } from "./ASCIIMathML";
import { fragmentMap } from "../problem/ui";

export function render(id, data) {
	let resNode = fragmentMap.get(id);
	let lines = data.split(/\n/);

	resNode.replaceChildren();
	lines.forEach((line) => {
		resNode.append(asciimath.parseMath(line));
	});
}

export function renderProblem(data) {
	let input = document.getElementById("inputArea");
	let output = document.getElementById("output");
	let id = input.getAttribute("uuid");

	render(id, data);

	output.replaceChildren(fragmentMap.get(id).cloneNode(true));
}
