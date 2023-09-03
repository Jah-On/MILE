// This file will generate the documentation for MIL
// It is meant to be run from the command line with node.js
import {charMap, leftOne, leftOneChar, leftTwo, middlePlusOne, 
        middlePlusOneChar, middlePlusTwo, operators, MLNameSpace } 
from "../src/constants.js";
import { preProccess, parse } from "../src/parser.js";
import { processor } from "../src/processors.js";
import { link } from "../src/htmlGen.js";
// import { JSDOM } from "jsdom";
// import pdfGen from "wkhtmltopdf";
import { mkdir } from "fs";
import { writeFile } from "fs/promises";

function main(){
    // let { window } = new JSDOM(`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><math><mrow><mfrac><mn>1</mn><mn>3</mn></mfrac></mrow></math></body></html>`);
    // window.document.body.style = "display: block; text-align: center;";
    let MILsrc = "";
    for (const key of charMap.keys()) {
        MILsrc += `\"${key}: \"${key}\n\n\n\n`;
    }
    for (const key of Object.keys(leftOne)) {
        MILsrc += `\"${key}: \"${key} x\n\n\n\n`;
    }
    for (const key of Object.keys(leftOneChar)) {
        MILsrc += `\"${key}: \"${key} x\n\n\n\n`;
    }
    for (const key of Object.keys(leftTwo)) {
        MILsrc += `\"${key}: \"${key} x y\n\n\n\n`;
    }
    for (const key of Object.keys(middlePlusOne)) {
        MILsrc += `\"${key}: \" x ${key} y\n\n\n\n`;
    }
    for (const key of Object.keys(middlePlusOneChar)) {
        MILsrc += `\"${key}: \" x ${key} y\n\n\n\n`;
    }
    for (const key of Object.keys(middlePlusTwo)) {
        MILsrc += `\"${key}: \" x ${key} y z\n\n\n\n`;
    }
    for (const key of Object.keys(operators)) {
        for (const mod of ["", "o", "u", "b"]){
            switch (mod) {
                case "o":
                case "u":
                    MILsrc += `\"${key}${mod}: \"${key}${mod} a x\n\n\n\n`;
                    break;
                case "b":
                    MILsrc += `\"${key}${mod}: \"${key}${mod} a b x\n\n\n\n`;
                    break;
                default:
                    MILsrc += `\"${key}${mod}: \"${key}${mod} x\n\n\n\n`;
                    break;
            }
        }
    }
    // PDF generation not working
    // Fails to render the mathml correctly
    // Hopefully this will be fixed in the future

    // console.log(preProccess(MILsrc)[0].outerHTML);
    // for (const element of preProccess(MILsrc)) {
    //     window.document.body.append(window.document.createElementNS(MLNameSpace, "math"));
    //     window.document.body.lastChild.append(element);
    //     console.log(window.document.body.lastChild.outerHTML);
    //     window.document.body.append(window.document.createElement("br"));
    //     window.document.body.append(window.document.createElement("br"));
    // }
    // pdfGen(window.document.documentElement.outerHTML, { pageSize: "letter", output: "DOCGEN.pdf", zoom: 1.5, debug: true });
    let MILobj = [{
        id:        "DOCGEN",
        src:       MILsrc,
    }];
    mkdir("./docs", { recursive: true }, (err) => {
        if (err) throw err;
    });
    writeFile("./docs/DOCGEN.mil", JSON.stringify(MILobj));
}

main();