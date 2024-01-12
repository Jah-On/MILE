export const asciiMathMap = new Map([
    ["toward", ["->",0]], ["limunder", ["lim_()", 1]], 
    ["intunder", ["int_()", 1]], ["inttop", ["int^()", 1]],
    ["intboth", ["int_()^()", 4]], ["sumunder", ["sum_()", 1]],
    ["sumtop", ["sum^()", 1]], ["sumboth", ["sum_()^()", 4]],
    ["laplace", ["ℒ{}", 1]], ["frac", ["frac{}{}", 3]],
    ["partial", ["del", 0]], ["sqrt", ["sqrt{}", 1]],
    ["root", ["root[]{}", 3]], ["hat", ["hat{}", 1]],
    ["bar", ["bar{}", 1]], ["vec", ["vec{}", 1]],
    ["text", ["text{}", 1]], 
]);
export const asciiMathRegex = `${[...asciiMathMap.keys()].join("|")}`;

export const markInMap = new Map([
    ["bold", ["b[]", 1]], ["heading", ["heading[,]", 2]]
]);

export const markInRegex = `${[...markInMap.keys()].join("|")}`;