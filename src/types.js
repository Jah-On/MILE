// export const NUMBER      = 0;
// export const VARIABLE    = 1;
// export const FUNCTION    = 3;
// export const GROUP_START = 4;
// export const GROUP_END   = 5;
// export const STRING      = 6;

// export const Number = {
//     type: NUMBER,
//     value,
// }
// export const Variable = {
//     type: VARIABLE,
//     value,
// }
// export const Symbol = {
//     type: SYMBOL,
//     value,
// }
// export const Function = {
//     type: FUNCTION,
//     value,
//     args, 
//     argsRight
// }
// export const Group_Start = {
//     type: GROUP_START,
//     value,
// }
// export const Group_End = {
//     type: GROUP_END,
//     value,
// }
// export const String = {
//     type: STRING,
//     value,
// }

// export class Number {
//     value = 0;
//     constructor(value="0") {
//         this.value = Number(value);
//     }
//     toString() {
//         return this.value.toString();
//     }
// }

// export class Variable {
//     name = "";
//     assignedValue = undefined;
//     constructor(name="") {
//         this.name = name;
//     }
//     assign(value) {
//         this.assignedValue = value;
//     }
// }

export class MathElement {
    constructor(type = "", children=[]) {
        this.type = type;
        this.children = children;
    }
}

export class MathStyle {
    constructor(attribute = "", value = "") {
        this.attribute = attribute;
        this.value = value;
    }
}