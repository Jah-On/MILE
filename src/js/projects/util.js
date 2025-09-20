import { fromTemplate } from "./ui.js";
import * as storage from "../storage/util.js";

export function importToLocal(event, name){ // TODO
    let target = event.target;
    let newID  = storage.create(name);
    fromTemplate(newID, name);
    // window.localStorage.setItem(name, target.result.toString());
}