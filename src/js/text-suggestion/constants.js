export const asciiMathMap = new Map([
    ["abs", ["abs{}", 1]], ["bar", ["bar{}", 1]], ["cancel", ["cancel{}", 1]], 
    ["ceil", ["ceil{}", 1]], ["dot", ["dot{}", 1]], ["doubledot", ["ddot{}", 1]], 
    ["floor", ["floor{}", 1]], ["frac", ["frac{}{}", 3]], 
    ["fraction", ["frac{}{}", 3]], ["hat", ["hat{}", 1]], ["infinity", ["oo", 0]], 
    ["intboth", ["int_{}^{}", 4]], ["intover", ["int^{}", 1]], 
    ["intunder", ["int_{}", 1]], ["limunder", ["lim_{}", 1]], 
    ["overbrace", ["obrace{}{}", 3]], ["overset", ["overset{}{}", 3]], 
    ["partial", ["del", 0]], ["power", ["^{}", 1]], 
    ["prodboth", ["prod_{}^{}", 4]], ["prodover", ["prod^{}", 1]], 
    ["produnder", ["prod_{}", 1]], ["strikethrough", ["cancel{}", 1]], 
    ["sumboth", ["sum_{}^{}", 4]], ["sumover", ["sum^{}", 1]], 
    ["sumunder", ["sum_{}", 1]], ["tilde", ["tilde{}", 1]], 
    ["towards", ["->", 0]], ["underbrace", ["ubrace{}{}", 3]], 
    ["underline", ["ul{}", 1]], ["underset", ["underset{}{}", 3]], 
    ["vec", ["vec{}", 1]], 
]);
export const asciiMathRegex = `${[...asciiMathMap.keys()].join("|")}`;

export const markInMap = new Map([
    ["bold", ["b[]", 1]], ["heading", ["heading[,]", 2]]
]);

export const markInRegex = `${[...markInMap.keys()].join("|")}`;