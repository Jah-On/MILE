// import { exportToJSON } from "../../helper.js";
import { generateDisplayName } from "./util.js";
import * as storage from "../storage/util.js";
import * as output from "../output/ui.js";

const functionArray = [updateName, moveUp, moveDown, copy, remove, edit];
const eventArray = ["input", "click", "click", "click", "click", "click"];

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const projectID   = urlParams.get("id");

let fragmentMap = storage.fragmentMap;

function addProblemListeners(problemRow) {
	for (let index = 0; index < eventArray.length; ++index) {
		problemRow.children[index].addEventListener(
			eventArray[index],
			functionArray[index],
		);
	}
}

function updateName(event) {
	let input  = event.target;
	let parent = input.parentElement;
	let id     = parent.id;

	fragmentMap.get(id).name = input.value;

	updateBaseOutput();
}

function move(node, direction) {
	let parent = node.parentElement;
	switch (direction) {
		case -1:
			parent.insertBefore(node.nextSibling || node, node);
			break;
		default:
			if (node == parent.firstElementChild) {
				break;
			}
			parent.insertBefore(node, node.previousSibling);
			break;
	}
	updateBaseOutput();
}

function moveDown(event) {
	let parent = event.target.parentElement;
	move(parent, -1);
}

function moveUp(event) {
	let parent = event.target.parentElement;
	move(parent, 1);
}

function copy(event) {
	let parent = event.target.parentElement;
	let newUUID = crypto.randomUUID();
	fragmentMap.set(newUUID, fragmentMap.get(parent.id).cloneNode(true));
	let cloned = parent.cloneNode(true);
	let firstChild = cloned.firstElementChild;
	cloned.id = newUUID;
	cloned.data = parent.data;
	firstChild.value = generateDisplayName(firstChild.value);
	addProblemListeners(cloned);
	parent.insertAdjacentElement("afterend", cloned);
	cloned.scrollIntoView();
	updateBaseOutput();
}

function remove(event) {
	let parent = event.target.parentElement;
	if (!window.confirm(`Are you sure you want to delete this problem?`)) {
		return;
	}
	parent.remove();
	fragmentMap.delete(parent.id);
	updateBaseOutput();
}

function edit(event) {
	let parent = event.target.parentElement;
	
	// sessionStorage.setItem(
	// 	"problemData",
	// 	fragmentMap.get(parent.id).data
	// );

	// let inputArea = document.getElementById("inputArea");
	// let cmView = inputArea.data;

	// cmView.dispatch({
	// 	changes: { from: 0, to: cmView.state.doc.length, insert: parent.data },
	// });

	// inputArea.children[0].focus();

	// output.renderProblem(parent.data);

	window.location.href = `/problem?project=${projectID}&id=${parent.id}`;
}

export function saveRowData(data) {
	let input = document.getElementById("inputArea");
	let UUID = input.getAttribute("UUID");
	let row = document.getElementById(UUID);

	row.data = data;
}

export function newProblemRow(UUID, displayName) {
	let rowTemplate = document.getElementById("rowTemplate");
	let clone = rowTemplate.content.firstElementChild.cloneNode(true);
	clone.id = UUID;
	clone.children[0].value = displayName;

	addProblemListeners(clone);
	return clone;
}

export function add(id, displayName, data = "") {
	let UUID = id;
	let problems = document.getElementById("problems").firstElementChild;
	let newRow = newProblemRow(UUID, displayName);

	const fragment = document.createDocumentFragment();
	fragment.name  = displayName;
	fragment.data  = data;
	fragment.id    = UUID;

	fragmentMap.set(UUID, fragment);

	(async () => {
		problems.append(newRow);
	})();

	if (displayName.length == 0){
		newRow.firstElementChild.focus();
	}

	return newRow;
}

export function updateBaseOutput() {
	let output = document.getElementById("output");
	let problems = document.getElementById("problems");
	let firstChild = problems.firstElementChild;
	let temp = document.createDocumentFragment();

	for (const item of firstChild.children) {
		let UUID = item.id;
		temp.append(document.createElement("div"));
		let divRef = temp.lastChild;
		divRef.className = "baseOutput";
		divRef.append(document.createElement("span"));
		const name = document.getElementById(UUID).children[0].value;
		if (name) {
			divRef.lastChild.innerText = name + ".";
		}
		divRef.lastChild.className = "baseOutputLabel";
		divRef.append(document.createElement("div"));
		divRef.lastChild.append(fragmentMap.get(UUID).cloneNode(true));
		divRef.lastChild.className = "baseOutputContents";
	}
	output.replaceChildren(temp);
}

export function goBack() {
	clearInterval(window.autoSave);
	
	window.location.href = "/";
}

export function loadAll(problems) {
	for (const id in problems) {
		const name = problems[id].name;
		const data = problems[id].data;

		let newRow = add(id, name, data);

		(async () => {
			output.render(newRow.id, data)
		})();
	}

	updateBaseOutput();
}
