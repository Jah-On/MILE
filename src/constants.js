import { MathElement } from "./types.js";

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
    ["degree","°"], ["Phi","Φ"], ["towards","➜"], ["tau", "τ"], 
    ["laplace", "ℒ"],

    ["-","−"], ["minus","−"], ["neg","¬"], ["plus","+"],
    ["sine","sin"], ["cosine","cos"], ["tangent","tan"],
    ["cotangent","cot"], ["secant","sec"], ["cosecant","csc"],
    ["equals","="], ["equiv","≡"], ["plusminus","±"], ["minusplus","∓"],
    ["+-", "±"], ["-+","∓"],

    ["and","⋀"], ["approx","≈"], ["cdot","⊙"], ["copen","◯"],
    ["cminus","⊖"], ["cplus","⊕"], ["cslash","⊘"], ["ctimes","⊗"],
    ["def","≝"], ["div","÷"], ["|","∣"], ["divides","∣"],
    ["dlarrow","⇐"], ["dlrarrow","⇔"], ["drarrow","⇒"],
    [">",">"], ["gthan",">"], ["gethan","≥"], ["geslant","⩾"],
    ["in","∈"], ["imgof","⊷"], ["intersect","∩"], ["<","<"],
    ["lthan","<"], ["lethan","≤"], ["leslant","⩽"], ["mgthan","≫"],
    ["mlthan","≪"], ["ndivides","∤"], ["noteq","≠"], ["notin","∉"],
    ["nprec","⊀"], ["nsucc","⊁"], ["nsubset","⊄"], ["nsubsete","⊈"],
    ["nsupset","⊅"], ["nsupsete","⊉"], ["owns","∋"], ["or","∨"],
    ["origof","⊶"], ["ortho","⟂"], ["parallel","∥"], ["prec","≺"],
    ["preceq","≼"], ["precsim","≾"], ["prop","∝"], ["setm","\\"],
    ["setq","/"], ["sim","∼"], ["simeq","≃"], ["stimes","*"],
    ["subset","⊂"], ["subsete","⊆"], ["succ","≻"], ["succeq","≽"],
    ["succsim","≿"], ["supset","⊃"], ["supsete","⊇"], ["*","⋅"],
    ["times","⋅"], ["union","∪"], ["xtimes","×"],

    // ["abs", "\|\|"], ["ceiling", "⌈⌉"], ["floor", "⌊⌋"], ["round", "⌊⌉"], 
    ["nroot", "√"],

    ["pow", "^"], ["sub", "_"]
]);
export const charRegex = `${[...charMap.keys()].join("|")}`;
export const leftOne       = [
    "abs", "ceiling", "floor", "round", "sqrt"
];
export const leftOneChar = [
    "−", "¬", "+", "sin", "cos", "tan", "cot", "sec", "csc", "=",
    "≡"
]
export const operators     = {
    "coprod":"∐", "int":"∫", "iint":"∬", "iiint":"∭", 
    "lim":"lim", "liminf":"lim inf", "limsup":"lim sup", 
    "lint":"∮", "llint":"∯", "lllint":"∰", "prod":"∏", 
    "sum":"∑"
};
export const leftTwo       = [
    "logbase", "evalint", "nroot"
];
export const middlePlusOne     = [
    "over",
];
export const middlePlusOneChar = [
    "⋀", "≈", "⊙", "◯", "⊖", "⊕", "⊘", "⊗", "≝", "/", "÷", 
    "∣", "⇐", "⇔", "⇒", ">", ">", "➜", "≥", "⩾", "∈", "⊷", 
    "∩", "<", "<", "≤", "⩽", "≫", "≪", "∤", "≠", "∉", "⊀", "⊁", 
    "⊄", "⊈", "⊅", "⊉", "∋", "∨", "⊶", "⟂", "∥", "≺", "≼", "≾", "∝", 
    "\\", "/", "∼", "≃", "*", "⊂", "⊆", "≻", "≽", "≿", "⊃", "⊇", "⋅", 
    "⋅", "∪", "×", "^", "_"
];
export const middlePlusTwo = [
    "supsub"
]
export const generationMap = {
    "abs": [new MathElement("mo", ["|"]), 0, new MathElement("mo", ["|"])],
    "ceiling": [new MathElement("mo", ["⌈"]), 0, new MathElement("mo", ["⌉"])],
    "evalint": [new MathElement("msubsup", [new MathElement("mo", ["|"]), 1, 0])],
    "floor": [new MathElement("mo", ["⌊"]), 0, new MathElement("mo", ["⌋"])],
    "logbase": [new MathElement("msub", [new MathElement("mtext", ["log"]), 0]), 1],
    "nroot": [new MathElement("mroot", [0, 1])],
    "over": [new MathElement("mfrac", [0, 1])],
    "^": [new MathElement("msup", [0, 1])],
    "round": [new MathElement("mo", ["⌊"]), 0, new MathElement("mo", ["⌉"])],
    "_": [new MathElement("msub", [0, 1])],
    "supsub": [new MathElement("msubsup", [0, 2, 1])],
    "sqrt": [new MathElement("msqrt", [0])],
    "vhat": [new MathElement("mover", [0, new MathElement("mo", ["^"])])],
}
export const MLNameSpace = "http://www.w3.org/1998/Math/MathML"
