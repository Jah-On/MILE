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
        lastSave:   new Date().toUTCString(),
        lastDelta: new Date().toUTCString()
    };
    storage.setItem(id, JSON.stringify(struct));
    return id;
}

export function save(id) {
    let struct     = JSON.parse(getRaw(id));
    let lastDelta  = Date.parse(struct.lastDelta);
    let time       = new Date();
    let newData    = exportProblems();

    if (((time.getTime() - lastDelta) >= 36e5) /* 1 hour */) { // 6e4 - 1 minute (for testing)
        struct.timestamps.push(time.toUTCString());
        struct.ids.push(crypto.randomUUID());
        struct.patches.push(struct.current);
        struct.lastTime = time.toUTCString();
    }
    struct.lastSave = time.toUTCString();
    struct.current  = dmp.patch_toText(extendPatches(struct.current, load(id), newData));
    
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

export function getNames() {
    let names = [];
    for (let i = 0; i < storage.length; i++) {
        names.push(JSON.parse(storage.getItem(storage.key(i))).name);
    }
    return names;
}

export function getLastSaves() {
    let lastSaves = [];
    for (let i = 0; i < storage.length; i++) {
        lastSaves.push(JSON.parse(storage.getItem(storage.key(i))).lastSave);
    }
    return lastSaves;
}

export function getIDsAlphabetically() {
    let names     = getNames().sort(
        (a, b) => a.localeCompare(b)
    );
    let ids       = [];
    let sortedIDs = [];
    for (let i = 0; i < storage.length; i++) {
        ids.push(storage.key(i));
    }

    let i = 0;
    while (ids.length > 0) {
        if (names[0] === getName(ids[i])) {
            sortedIDs.push(ids[i]);
            ids.splice(i, 1);
            names.shift();
            i = 0;
        } else {
            i++;
        }
    }

    return sortedIDs;
}

export function getIDsByLastSave() {
    let times     = getLastSaves().sort(
        (a, b) => Date.parse(a) - Date.parse(b)
    ).reverse();
    let ids       = [];
    let sortedIDs = [];
    for (let i = 0; i < storage.length; i++) {
        ids.push(storage.key(i));
    }

    let i = 0;
    while (ids.length > 0) {
        if (times[0] === JSON.parse(storage.getItem(ids[i])).lastSave) {
            sortedIDs.push(ids[i]);
            ids.splice(i, 1);
            times.shift();
            i = 0;
        } else {
            i++;
        }
    }

    return sortedIDs;
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
    let data = getRaw(id);
    let name = JSON.parse(data).name;
    let link = document.createElement("a");
    link.download = `${name}.m3`;
    let blobby = new Blob([data], {type:"text/plain"});
    let downloadURL = window.URL.createObjectURL(blobby);
    link.href = downloadURL;
    link.click();
    link.remove();
}

function handleSelectedFile(event){
    let fileIOHandle = new FileReader;
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", importToLocal);
}

function importToLocal(event){ // TODO: update 
    const data   = event.target.result;
    const names  = getNames();
    let   struct = JSON.parse(data);

    while (names.includes(struct.name)) {
        struct.name += "(1)";
    }

    localStorage.setItem(
        crypto.randomUUID(), 
        JSON.stringify(struct)
    );
    project.loadAll();
}