import * as google_dmp from "./diff_match_patch.js"

const dmp = new google_dmp.diff_match_patch();

export function save(id, data) {
    localStorage.setItem(id, data);
}