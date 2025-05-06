export interface propFunc{
    labelInput: string, 
    value: any,//string | Date | Number | undefined, 
    onChange: (e: any) => void, 
    type: string
    width?: string | widthObject
}

interface widthObject {
    base:string,
    sm?: string,
    md?: string,
    lg?:string
}