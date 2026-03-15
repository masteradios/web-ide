
export interface INode {
    name: string,
    children?: string[], 
    isFile: boolean,
    uri: string,
    isExpanded: boolean,
    isSelected: boolean,
    parent: string
}
