export const NUMBER      = 0;
export const VARIABLE    = 1;
export const SYMBOL      = 2;
export const FUNCTION    = 3;
export const GROUP_START = 4;
export const GROUP_END   = 5;
export const STRING      = 6;

export const charMap = new Map([
    ["aleph","ℵ"], ["bot","⊥"], ["cns","ℂ"], ["delta","Δ"],
    ["ens","∅"], ["exists","∃"], ["forall","∀"], ["infinity","∞"],
    ["ins","ℤ"], ["nns","ℕ"], ["prime","'"], ["rans","ℚ"],
    ["rens","ℝ"], ["theta","θ"], ["top","⊤"], ["upsilon","υ"],
    ["phi","φ"], ["rho","ρ"], ["sigma","ς"], ["wp","℘"], ["zeta","ζ"],
    ["alpha","α"], ["beta","β"], ["gamma","γ"], ["Delta","δ"],
    ["epsilon","ε"], ["eta","η"], ["pi","π"], ["Omega","Ω"],
    ["omega","ω"], ["lambda","λ"], ["mu","μ"], ["angle","∠"],
    ["degree","°"], ["Phi","Φ"], ["towards","➜"],
]);
export const charRegex = `${[...charMap.keys()].join("|")}`;
export const leftOne       = {
    "abs":"", "ceiling":"", "floor":"", "round":"", "sqrt":""
};
export const leftOneChar   = {
    "-":"−", "minus":"−", "neg":"¬", "+":"+", "plus":"+",
    "sine":"sin", "cosine":"cos", "tangent":"tan",
    "cotangent":"cot", "secant":"sec", "cosecant":"csc",
    "=":"=", "equals":"=", "equiv":"≡",
};
export const operators     = {
    "coprod":"∐", "int":"∫", "iint":"∬", "iiint":"∭", 
    "lim":"lim", "liminf":"lim inf", "limsup":"lim sup", 
    "lint":"∮", "llint":"∯", "lllint":"∰", "prod":"∏", 
    "sum":"∑"
};
export const leftTwo       = {
    "frac":"", "logbase":"", "evalint":"", "nroot":""
};
export const middlePlusOne     = {
    "over":"", "^":"", "pow":""
};
export const middlePlusOneChar = {
    "and":"⋀", "approx":"≈", "cdot":"⊙", "copen":"◯", 
    "cminus":"⊖", "cplus":"⊕", "cslash":"⊘", "ctimes":"⊗", 
    "def":"≝", "/":"/", "div":"÷", "|":"∣", "divides":"∣", 
    "dlarrow":"⇐", "dlrarrow":"⇔", "drarrow":"⇒", 
    ">":">", "gthan":">", 
    "gethan":"≥", "geslant":"⩾", "in":"∈", "imgof":"⊷", 
    "intersect":"∩", "<":"<", "lthan":"<", "lethan":"≤", 
    "leslant":"⩽", "mgthan":"≫", "mlthan":"≪", 
    "ndivides":"∤", "noteq":"≠", "notin":"∉", "nprec":"⊀", 
    "nsucc":"⊁", "nsubset":"⊄", "nsubsete":"⊈", "nsupset":"⊅", 
    "nsupsete":"⊉", "owns":"∋", "or":"∨", "origof":"⊶", 
    "ortho":"⟂", "parallel":"∥", "prec":"≺", "preceq":"≼", 
    "precsim":"≾", "prop":"∝", "setm":"\\", "setq":"/", 
    "sim":"∼", "simeq":"≃", "stimes":"*", "subset":"⊂", 
    "subsete":"⊆", "succ":"≻", "succeq":"≽", "succsim":"≿", 
    "supset":"⊃", "supsete":"⊇", "*":"⋅", "times":"⋅", 
    "union":"∪", "xtimes":"×"
};
export const middlePlusTwo = {
    "supsub":""
}
export const MLNameSpace = "http://www.w3.org/1998/Math/MathML"