import diff_match_patch from "diff-match-patch";

const storage = window.localStorage;
const dmp     = new diff_match_patch();

export function exists(id) {
    for (let i = 0; i < storage.length; i++) {
        if (storage.key(i) === id) {
            return true;
        }
    }
    return false;
}

export function save(id) {
    switch (exists(id)) {
        case false:
            saveNew(id);
            break;
        default:
            saveExisting(id);
            break;
    }
}

function saveNew(id) {
    let struct = {
        name:    id,
        commits: {}
    };
    struct.commits[Date.now()] = generateCommit(
        [], exportProblems()
    );
    storage.setItem(id, JSON.stringify(struct));
}

function saveExisting(id) {
    let struct = JSON.parse(storage.getItem(id));
    struct.commits[Date.now()] = generateCommit(
        load(id),
        exportProblems()
    );
    storage.setItem(id, JSON.stringify(struct));
}

export function load(id) {
    let struct = JSON.parse(storage.getItem(id));
    let text   = "";
    for (const commit in struct.commits) {
        text = dmp.patch_apply(
            struct.commits[commit].patches, text
        )[0];
    }
    console.log(text);
    return text;
}

function generateCommit(previousPatches, current) {
    let previous = dmp.patch_toText(previousPatches);
    let diffs = dmp.diff_main(previous, current);
    dmp.diff_cleanupEfficiency(diffs);
    return {
        id:      crypto.randomUUID(),
        patches: dmp.patch_make(previous, diffs)
    };
}

function exportProblems(){
    let output   = [];
    let problems = [...document.getElementsByClassName("problem")];
    problems.map((problem) => {
        output.push({
            name: problem.firstElementChild.value, 
            data: problem.data
        });
    });
    return JSON.stringify(output);
}

export function copy(id, newName) {
    let saved = storage.getItem(id);
    storage.setItem(newName, saved);
}

export function remove(id) {
    storage.removeItem(id);
}

export function rename(oldName, newName) {
    let saved = storage.getItem(oldName);
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
    downloadLink.download = `${name}.m3`;
    let blobby = new Blob([exportToJSON()], {type:"text/plain"});
    let downloadURL = window.URL.createObjectURL(blobby);
    downloadLink.href = downloadURL;
    downloadLink.click();
    link.remove();
}

function handleSelectedFile(event){
    let fileIOHandle = new FileReader;
    fileIOHandle.readAsText(event.target.files[0]);
    fileIOHandle.addEventListener("loadend", importToLocal);
    //     importToLocal(e, event.target.files[0].name.slice(0, -4));
    // });
}

function importToLocal(event){
    // let data = event.target.result;
    // localStorage.setItem(name, data);
    // loadAll();
}