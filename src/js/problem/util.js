const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

export function generateDisplayName(current=""){
    if (!current){ return ""; }
    if (/.*[a-y]/.test(current)){
        return current.slice(0, -1) + alphabet[alphabet.indexOf(current.slice(-1)) + 1];
    } else {
        return current + "a";
    }
}