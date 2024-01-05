import { asciimath } from "./ASCIIMathML"

export function render() {
    let input   = document.getElementById("inputArea");
    let data    = input.innerText;
    let resNode = [];
    let lines   = data.split(/\n{2,}/);
    lines.forEach(line => {
        resNode.push(
            asciimath.parseMath(
                line.replaceAll("\n", "")
            )
        );
    });
    let output  = document.getElementById("output");
    output.replaceChildren(...resNode);
}