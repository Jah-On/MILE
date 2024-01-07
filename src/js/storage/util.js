import diff_match_patch from "diff-match-patch";
import * as project     from "../project/ui.js";

const storage = window.localStorage;
const dmp     = new diff_match_patch();

const saveRoute = new Map([
    [true, saveExisting],
    [false, saveNew]
]);

export function exists(id) {
    for (let i = 0; i < storage.length; i++) {
        if (storage.key(i) === id) { return true; }
    }
    return false;
}

export function save(id) {
    saveRoute.get(exists(id))(id);
}

function saveNew(id) {
    let struct = {
        name:    id,
        commits: {}
    };
    struct.commits[Date.now()] = generateCommit(
        "", exportProblems()
    );
    storage.setItem(id, JSON.stringify(struct));
}

function saveExisting(id) {
    let struct     = JSON.parse(getRaw(id));
    let commitKeys = Object.keys(struct.commits);
    let lastTime   = commitKeys[commitKeys.length - 1];
    if ((Date.now() - lastTime) < 36e5 /* 1 hour */) { // 6e4 - 1 minute (for testing)
        struct.commits[lastTime].patches = regeneratePatches(
            struct.commits[lastTime].patches,
            exportProblems()
        );
    } else {
        struct.commits[Date.now()] = generateCommit(
            struct.commits[lastTime].patches,
            exportProblems()
        );
    }
    let res = JSON.stringify(struct);
    storage.setItem(id, res);
}

function getRaw(id) {
    return storage.getItem(id);
}

export function load(id) {
    const stored = getRaw(id);
    const struct = JSON.parse(stored);
    let   last   = Object.keys(struct.commits).length - 1;
    let   patch  = struct.commits[Object.keys(struct.commits)[last]].patches;
    let   data   = dmp.patch_apply(dmp.patch_fromText(patch), "")[0];
    return data;
}

function generateCommit(patchesText, newData) {
    console.log("generating commit");
    const result  = {
        id:          crypto.randomUUID(),
        patches:     regeneratePatches(patchesText, newData),
    };
    return result;
}    

function regeneratePatches(patchesText, newData) {
    let oldData = "";
    let prevPatches = dmp.patch_fromText(patchesText);
    oldData = dmp.patch_apply(
        prevPatches, oldData
    )[0];
    const diffs = dmp.diff_main(oldData, newData);
    dmp.diff_cleanupEfficiency(diffs);
    prevPatches.push(...dmp.patch_make(oldData, diffs));
    return dmp.patch_toText(prevPatches);
}

function exportProblems(){
    let   output   = [];
    const problems = [...document.getElementsByClassName("problem")];
    problems.map((problem) => {
        output.push({
            name: problem.firstElementChild.value, 
            data: problem.data.replace(/\n$/, "")
        });
    });
    const result = JSON.stringify(output);
    return result;
}

export function copy(id, newName) {
    let saved = getRaw(id);
    storage.setItem(newName, saved);
}

export function remove(id) {
    storage.removeItem(id);
}

export function rename(oldName, newName) {
    let saved = getRaw(oldName);
    storage.setItem(newName, saved);
    remove(oldName);
}

export async function uploadM3(){
    let picker = document.createElement("input");
    picker.type     = "file";
    picker.accept   = ".m3";
    picker.multiple = false;
    picker.addEventListener("change", handleSelectedFile);
    picker.showPicker();
}

export function downloadM3(){
    let name = document.getElementById("project").getAttribute("data-name");
    let link = document.createElement("a");
    link.download = `${name}.m3`;
    let blobby = new Blob([getRaw(name)], {type:"text/plain"});
    let downloadURL = window.URL.createObjectURL(blobby);
    link.href = downloadURL;
    link.click();
    link.remove();
}

function handleSelectedFile(event){
    let fileIOHandle = new FileReader;
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", 
        (e) => {
            importToLocal(e, event.target.files[0].name.slice(0, -3));
        }
    );
}

function importToLocal(event, name){
    while (exists(name)) {
        name += "(1)";
    }
    const data = event.target.result;
    localStorage.setItem(name, data);
    project.loadAll();
}