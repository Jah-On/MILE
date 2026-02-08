import diff_match_patch from "diff-match-patch";
import { loadAll } from "../projects/ui";

const storage = window.localStorage;
const dmp     = new diff_match_patch();

export const fragmentMap = new Map();

export const autoSaveInterval = 30e4; // 5 minutes

export function exists(id) {
    for (let i = 0; i < storage.length; i++) {
        if (storage.key(i) === id) { return true; }
    }
    return false;
}

export function create(name) {
    let id      = crypto.randomUUID();
    let struct  = {
        name:       name,
        version:    "0.1",
        timestamps: [],
        ids:        [],
        patches:    [],
        current:    "{}",
        lastSave:   new Date().toUTCString(),
        lastDelta:  new Date().toUTCString()
    };

    storage.setItem(id, JSON.stringify(struct));
    
    return id;
}

export function save(id) {
    let project    = JSON.parse(getRaw(id));

    // console.log(project);

    let lastDelta  = Date.parse(project.lastDelta);
    let time       = new Date();
    let oldData    = JSON.stringify(project.current);

    // let timeNow    = performance.now();

    let newData    = exportProblems();

    if (((time.getTime() - lastDelta) >= 36e5) /* 1 hour */) { // 6e4 - 1 minute (for testing)
        let patch = dmp.patch_make(
            newData, oldData
        )

        let patchesAsText = dmp.patch_toText(patch);

        if (patchesAsText.length == 0) return;

        project.timestamps.push(time.toUTCString());
        project.ids.push(crypto.randomUUID());
        project.patches.push(patchesAsText);
        project.lastDelta = time.toUTCString();
    }
    project.lastSave = time.toUTCString();
    project.current  = newData;

    let res = JSON.stringify(project);

    storage.setItem(id, res);
}

export function saveFromStruct(id, struct) {
    let project    = JSON.parse(getRaw(id));

    let lastDelta  = Date.parse(project.lastDelta);
    let time       = new Date();
    let oldData    = JSON.stringify(project.current);

    // let timeNow    = performance.now();

    let newData    = JSON.stringify(struct);

    if (((time.getTime() - lastDelta) >= 36e5) /* 1 hour */) { // 6e4 - 1 minute (for testing)
        let patch = dmp.patch_make(
            newData, oldData
        )

        let patchesAsText = dmp.patch_toText(patch);

        if (patchesAsText.length == 0) return;

        project.timestamps.push(time.toUTCString());
        project.ids.push(crypto.randomUUID());
        project.patches.push(patchesAsText);
        project.lastDelta = time.toUTCString();
    }
    project.lastSave = time.toUTCString();
    project.current  = newData;

    let res = JSON.stringify(project);

    storage.setItem(id, res);
}

function getRaw(id) {
    return storage.getItem(id);
}

export function load(id) {
    const stored = getRaw(id);
    let   struct = JSON.parse(stored);

    if (struct.version == undefined){
        console.log("Caught old save system!");
        struct = translateFromMajs_0_0(struct);

        let res = JSON.stringify(struct);

        storage.setItem(id, res);
    }

    return struct.current;
}

function exportProblems(){
    let output = {};

    fragmentMap.forEach((fragment) => {
        const id   = fragment.id;
        const name = fragment.name;
        const data = fragment.data.replace(/\n$/, "");

        output[id] = {
            name: name, 
            data: data
        };
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

    let patchIndex = saved.patches.length - 1 - index;
    let selected   = saved.patches.slice(0, patchIndex);

    for (const patchText of selected){
        saved.current    = dmp.patch_apply(
            dmp.patch_fromText(patchText), saved.current
        )[0];
    }
    saved.patches    = saved.patches.slice(patchIndex);
    saved.timestamps = saved.timestamps.slice(0, index);
    saved.ids        = saved.ids.slice(0, index);

    storage.setItem(id, JSON.stringify(saved));
}1

export async function upload(){
    let picker = document.createElement("input");
    picker.type     = "file";
    picker.accept   = ".majs";
    picker.multiple = false;
    picker.addEventListener("change", handleSelectedFile);
    picker.showPicker();
}

export function download(){
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    const id          = urlParams.get("id");

    let data = getRaw(id);
    let name = JSON.parse(data).name;
    let link = document.createElement("a");
    link.download = `${name}.majs`;
    let blobby = new Blob([data], {type:"text/plain"});
    let downloadURL = window.URL.createObjectURL(blobby);
    link.href = downloadURL;
    link.click();
    link.remove();
}

function translateFromMajs_0_0(old){
    let patches = [];
    let data    = [old.initial];
    let current = "";

    for (const patchesText of old.patches) {
        patches = dmp.patch_fromText(patchesText);
        data.push(
            dmp.patch_apply(
                patches,
                data.at(data.lastIndexOf())
            )[0]
        );
    }
    patches = dmp.patch_fromText(old.current);
    data.push(
        dmp.patch_apply(
            patches, 
            data.at(data.lastIndexOf())
        )[0]
    );

    current = data.at(-1);

    let newMajs = old;
    delete newMajs.initial;

    newMajs.version = "0.1";
    newMajs.current = current;

    newMajs.patches = [];
    for (const text of data.slice(0, -1).reverse()) {
        if (current === text) console.log("Text same!");
        newMajs.patches.push(
            dmp.patch_toText(dmp.patch_make(current, text))
        );
        current = text;
    }

    let currentAsArray = JSON.parse(newMajs.current);
    let currentAsStruct = {};

    for (const problem of currentAsArray){
        currentAsStruct[crypto.randomUUID()] = {
            name: problem.name, 
            data: problem.data
        };
    }

    newMajs.current = JSON.stringify(currentAsStruct)

    // console.log(newMajs.patches.length);
    // console.log(newMajs.patches);

    return newMajs;
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
    loadAll();
}