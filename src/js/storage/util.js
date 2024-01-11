import diff_match_patch from "diff-match-patch";
import * as project     from "../project/ui.js";

const storage = window.localStorage;
const dmp     = new diff_match_patch();

export function exists(id) {
    for (let i = 0; i < storage.length; i++) {
        if (storage.key(i) === id) { return true; }
    }
    return false;
}

export function create(name) {
    let id      = crypto.randomUUID();
    let current = exportProblems();
    let struct = {
        name:       name,
        timestamps: [],
        ids:        [],
        patches:    [],
        initial:    current,
        current:    "",
        lastTime:   new Date().toUTCString()
    };
    storage.setItem(id, JSON.stringify(struct));
    return id;
}

export function save(id) {
    let struct     = JSON.parse(getRaw(id));
    let lastTime   = Date.parse(struct.lastTime);
    let time       = new Date();
    let newData    = exportProblems();

    if (((time.getTime() - lastTime) >= 36e5) /* 1 hour */) { // 6e4 - 1 minute (for testing)
        struct.timestamps.push(time.toUTCString());
        struct.ids.push(crypto.randomUUID());
        struct.patches.push(struct.current);
        struct.lastTime = time.toUTCString();
    }
    struct.current = dmp.patch_toText(extendPatches(struct.current, load(id), newData));
    
    let res = JSON.stringify(struct);
    storage.setItem(id, res);
}

function getRaw(id) {
    return storage.getItem(id);
}

export function load(id) {
    const stored = getRaw(id);
    const struct = JSON.parse(stored);
    let   data   = struct.initial;
    let   patches;
    for (const patchesText of struct.patches) {
        patches = dmp.patch_fromText(patchesText);
        data = dmp.patch_apply(patches, data)[0];
    }
    patches = dmp.patch_fromText(struct.current);
    data = dmp.patch_apply(patches, data)[0];
    return data;
}

function extendPatches(patchesText, oldData, newData) {
    const diffs = dmp.diff_main(oldData, newData);
    dmp.diff_cleanupEfficiency(diffs);
    let patches = dmp.patch_fromText(patchesText);
    patches.push(...dmp.patch_make(oldData, diffs));
    return patches;
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
    let newID  = crypto.randomUUID();
    let saved  = JSON.parse(getRaw(id));
    saved.name = newName;

    storage.setItem(newID, JSON.stringify(saved));
    return newID;
}

export function remove(id) {
    storage.removeItem(id);
}

export function getName(id){
    return JSON.parse(getRaw(id)).name;
}

export function rename(id, newName) {
    let saved = JSON.parse(getRaw(id));
    saved.name = newName;

    storage.setItem(id, JSON.stringify(saved));
}

export function getCommits(id) {
    return JSON.parse(getRaw(id)).timestamps;
}

export function rebaseTo(id, index) {
    let saved   = JSON.parse(getRaw(id));
    saved.current    = saved.patches[index];
    saved.patches    = saved.patches.slice(0, index);
    saved.timestamps = saved.timestamps.slice(0, index);
    saved.ids        = saved.ids.slice(0, index);

    storage.setItem(id, JSON.stringify(saved));
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
    let id = document.getElementById("project").getAttribute("data-id");
    let name = JSON.parse(getRaw(id)).name;
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

function importToLocal(event, name){ // TODO: update
    while (exists(name)) {
        name += "(1)";
    }
    const data = event.target.result;
    localStorage.setItem(name, data);
    project.loadAll();
}