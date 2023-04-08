import { readFile, writeFile } from "fs/promises";

function processors(data){
    writeFile(  `src/processors.js`, 
                data.replace(`/* ### */`, 
'import { JSDOM } from "jsdom";\n\
let dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);\n\
let document = dom.window.document;'
                )
    );
}

function htmlGen(data){
    writeFile(  `src/htmlGen.js`, 
                data.replace(`/* ### */`, 
'import { JSDOM } from "jsdom";\n\
let dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);\n\
let document = dom.window.document;'
                )
    );
}

function main(){
    readFile(`src/processors.js`, "utf-8").then(processors);
    readFile(`src/htmlGen.js`, "utf-8").then(htmlGen);
}

main();