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
import { fragmentMap } from "../storage/util.js";

const queryString = window.location.search;
const urlParams   = new URLSearchParams(queryString);
const problemID   = urlParams.get("id");

window.addEventListener("load", () => {
    fragmentMap.set(problemID, document.createDocumentFragment());

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

    let data = sessionStorage.getItem("problemData");

    inputElement.data.dispatch({
		changes: { from: 0, to: inputElement.data.state.doc.length, insert: data },
	});
});
