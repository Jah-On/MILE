const constants = "./src/js/text-suggestion/constants.js";
const csvPath = "./src/suggestion_list.csv";
const READMEPath = "./README.md";
import fs from "fs";

function readCSVasList() {
	let file = fs.readFileSync(csvPath, "utf8");
	let lines = file.split("\n");
	if (lines[lines.length - 1].length == 0) {
		lines = lines.slice(0, -1);
	}
	let list = [];
	for (const line of lines) {
		let parts = line.split(",");
		list.push(parts);
	}
	return list;
}

function writeToConstants() {
	let table = generateJSList();
	let data = fs.readFileSync(constants, "utf8");
	data = data.replace(
		/\/\* FOR AUTOGEN \*\/[\s\S]+\/\* END AUTOGEN \*\//gm,
		`/* FOR AUTOGEN */ ${table}/* END AUTOGEN */`,
	);
	fs.writeFileSync(constants, data, "utf8");
}

function writeToREADME() {
	let table = generateTable();
	let data = fs.readFileSync(READMEPath, "utf8");
	data = data.replace(
		/<!-- FOR DOC GEN -->[\s\S]+<!---->/gm,
		`<!-- FOR DOC GEN -->\n${table}<!---->`,
	);
	fs.writeFileSync(READMEPath, data, "utf8");
}

function listCommands() {
	console.log("Commands: ");
	console.log("\thelp,  -h, --help:    Display this message");
	console.log("\ttable, -t, --table:   Generate table for markdown");
	console.log("\tlist,  -l, --list:     Generate array for autocompletion");
	console.log("\twrite, -w, --write:   Write to constants.js and README.md");
}

function generateTable() {
	let result = "| Name | ASCIIMath Equivalent |\n";
	result += "| ---- | -------------------- |\n";
	for (const row of readCSVasList()) {
		result += `| ${row[0]} | ${row[1]} |\n`;
	}
	return result;
}

function generateJSList() {
	let result = "Array(\n";
	for (const row of readCSVasList()) {
		result += `\t{ label:\"${row[0]}\", type:\"text\", apply:\"${row[1]}\"}, \n`;
	}
	result += ");\n";
	return result;
}

function main() {
	let arg = process.argv[2];
	switch (arg) {
		case "help":
		case "-h":
		case "--help":
			listCommands();
			break;
		case "table":
		case "-t":
		case "--table":
			console.log(generateTable());
			break;
		case "list":
		case "-l":
		case "--list":
			console.log(generateJSList());
			break;
		case "write":
		case "-w":
		case "--write":
			writeToConstants();
			writeToREADME();
			break;
		default:
			listCommands();
			break;
	}
}

main();
