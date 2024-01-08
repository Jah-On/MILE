import { fromTemplate } from "./ui.js";

export function importToLocal(event, name){
    let target = event.target;
    fromTemplate(name);
    // window.localStorage.setItem(name, target.result.toString());
}