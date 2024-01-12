const csvPath = "./src/suggestion_list.csv";
import fs from "fs";

function readCSVasList() {
    let file = fs.readFileSync(csvPath, "utf8");
    let lines = file.split("\n");
    let list = [];
    for (const line of lines) {
        let parts = line.split(",");
        list.push(parts);
    }
    return list;

}

function listCommands() {
    console.log("Commands: ");
    console.log("\thelp,  -h, --help:    Display this message");
    console.log("\ttable, -t, --table:   Generate table for markdown");
    console.log("\tmap,   -m, --map:     Generate map for javascript");
}

function generateTable() {
    let result  = "| Name | ASCIIMath Equivalent |\n";
    result     += "| ---- | -------------------- |\n";
    for (const row of readCSVasList()) {
        result += `| ${row[0]} | ${row[1]} |\n`;
    }
    return result;
}

function generateJSMap() {
    let result = "Map([\n";
    let line   = "\t";
    for (const row of readCSVasList()) {
        let temp = `[\"${row[0]}\", [\"${row[1]}\", ${row[2]}]], `;
        if (line.length + temp.length > 80) {
            result += `${line}\n`;
            line    = "\t";
        }
        line += temp;
    }
    result += `${line}\n`;
    result += "]);\n";
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
        case "map":
        case "-m":
        case "--map":
            console.log(generateJSMap());
            break;
        default:
            listCommands();
            break;
    }
}

main();