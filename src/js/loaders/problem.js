import { EditorView, gutter, lineNumbers, placeholder } from "@codemirror/view";
import { EditorState, Line } from "@codemirror/state";
import { minimalSetup } from "codemirror";
import {
    autocompletion,
    closeBrackets,
    completeFromList
} from "@codemirror/autocomplete";
import { autoCompleteList } from "../text-suggestion/constants.js";
import { handleInput } from "../input/key.js";
import { fragmentMap, load, saveFromStruct } from "../storage/util.js";

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const projectID   = urlParams.get("project");
const problemID   = urlParams.get("id");

window.addEventListener("load", () => {
    fragmentMap.set(problemID, document.createDocumentFragment());

    let problem = JSON.parse(load(projectID))[problemID]

    const inputElement = document.getElementById("inputArea");
    
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
                EditorView.updateListener.of(handleInput),
            ],
        }),
    });

    let data = problem.data;

    inputElement.data.dispatch({
		changes: { from: 0, to: inputElement.data.state.doc.length, insert: data },
	});

    document
        .getElementById("backButton")
        .addEventListener("click", 
            () => {
                window.location.href = `/project?id=${projectID}`
            }
        );
});

window.addEventListener("beforeunload", () => {
        let inputElement = document.getElementById("inputArea")

        let project = JSON.parse(load(projectID))

        project[problemID].data = inputElement.data.state.doc.text.join("\n")

        saveFromStruct(projectID, project)
    }
)