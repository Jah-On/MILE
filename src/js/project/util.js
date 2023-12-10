import { fromTemplate } from "./ui.js";

export function importToLocal(event = new ProgressEvent(""), name = ""){
    fromTemplate(name);
    window.localStorage.setItem(name, event.target.result);
}