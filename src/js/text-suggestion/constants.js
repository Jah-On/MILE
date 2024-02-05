export const asciiMathMap = new /* FOR AUTOGEN */ Map([
	["abs", ["abs{}", 1]], ["alpha", ["alpha", 0]], ["bar", ["bar{}", 1]], 
	["because", [":'", 0]], ["beta", ["beta", 0]], ["cancel", ["cancel{}", 1]], 
	["ceil", ["ceil{}", 1]], ["chi", ["chi", 0]], ["complexnumberset", ["CC", 0]], 
	["delta", ["delta", 0]], ["Delta", ["Delta", 0]], ["dot", ["dot{}", 1]], 
	["doubledot", ["ddot{}", 1]], ["emptyset", ["O/", 0]], 
	["epsilon", ["epsilon", 0]], ["equals", ["=", 0]], ["eta", ["eta", 0]], 
	["floor", ["floor{}", 1]], ["fraction", ["frac{}{}", 3]], 
	["gamma", ["gamma", 0]], ["Gamma", ["Gamma", 0]], ["greaterthan", [">", 0]], 
	["greaterorequals", [">=", 0]], ["hat", ["hat{}", 1]], 
	["infinity", ["oo", 0]], ["intboth", ["int_{}^{}", 4]], 
	["integernumberset", ["ZZ", 0]], ["intover", ["int^{}", 1]], 
	["intunder", ["int_{}", 1]], ["iota", ["iota", 0]], ["kappa", ["kappa", 0]], 
	["lambda", ["lambda", 0]], ["Lambda", ["Lambda", 0]], ["lessthan", ["<", 0]], 
	["lessorequals", ["<=", 0]], ["limunder", ["lim_{}", 1]], ["mu", ["mu", 0]], 
	["naturalnumberset", ["NN", 0]], ["notequal", ["!=", 0]], ["nu", ["nu", 0]], 
	["omega", ["omega", 0]], ["Omega", ["Omega", 0]], 
	["overbrace", ["obrace{}{}", 3]], ["overset", ["overset{}{}", 3]], 
	["partial", ["del", 0]], ["phi", ["phi", 0]], ["Phi", ["Phi", 0]], 
	["pi", ["pi", 0]], ["Pi", ["Pi", 0]], ["power", ["^{}", 1]], 
	["prodboth", ["prod_{}^{}", 4]], ["prodover", ["prod^{}", 1]], 
	["produnder", ["prod_{}", 1]], ["psi", ["psi", 0]], ["Psi", ["Psi", 0]], 
	["rationalnumberset", ["QQ", 0]], ["realnumberset", ["RR", 0]], 
	["rho", ["rho", 0]], ["sigma", ["sigma", 0]], ["Sigma", ["Sigma", 0]], 
	["strikethrough", ["cancel{}", 1]], ["sumboth", ["sum_{}^{}", 4]], 
	["sumover", ["sum^{}", 1]], ["sumunder", ["sum_{}", 1]], ["tau", ["tau", 0]], 
	["text", ["text()", 1]], ["therefore", [":.", 0]], ["theta", ["theta", 0]], 
	["Theta", ["Theta", 0]], ["tilde", ["tilde{}", 1]], ["times", ["×", 0]], 
	["towards", ["->", 0]], ["underbrace", ["ubrace{}{}", 3]], 
	["underline", ["ul{}", 1]], ["underset", ["underset{}{}", 3]], 
	["upsilon", ["upsilon", 0]], ["vec", ["vec{}", 1]], ["xi", ["xi", 0]], 
	["Xi", ["Xi", 0]], ["zeta", ["zeta", 0]], 
]);
/* END AUTOGEN */
export const asciiMathRegex = `${[...asciiMathMap.keys()].join("|")}`;

export const markInMap = new Map([
    ["bold", ["b[]", 1]], ["heading", ["heading[,]", 2]]
]);

export const markInRegex = `${[...markInMap.keys()].join("|")}`;