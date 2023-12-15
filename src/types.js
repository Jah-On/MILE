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