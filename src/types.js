export const NUMBER      = 0;
export const VARIABLE    = 1;
export const SYMBOL      = 2;
export const FUNCTION    = 3;
export const GROUP_START = 4;
export const GROUP_END   = 5;
export const STRING      = 6;

export const Number = {
    type: NUMBER,
    value,
}
export const Variable = {
    type: VARIABLE,
    value,
}
export const Symbol = {
    type: SYMBOL,
    value,
}
export const Function = {
    type: FUNCTION,
    value,
    args, 
    argsRight
}
export const Group_Start = {
    type: GROUP_START,
    value,
}
export const Group_End = {
    type: GROUP_END,
    value,
}
export const String = {
    type: STRING,
    value,
}