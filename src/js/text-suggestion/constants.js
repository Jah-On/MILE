export const asciiMathMap = new Map([
    ["toward", ["->",0]], ["limunder", ["lim_()", 1]], 
    ["intunder", ["int_()", 1]], ["inttop", ["int^()", 1]],
    ["intboth", ["int^()_()", 4]], ["sumunder", ["sum_()", 1]],
    ["sumtop", ["sum^()", 1]], ["sumboth", ["sum^()_()", 4]],
    ["laplace", ["ℒ{}", 1]], 
]);
export const asciiMathRegex = `${[...asciiMathMap.keys()].join("|")}`;

export const markInMap = new Map([
    ["bold", ["b[]", 1]], ["heading", ["heading[,]", 2]]
]);

export const markInRegex = `${[...markInMap.keys()].join("|")}`;