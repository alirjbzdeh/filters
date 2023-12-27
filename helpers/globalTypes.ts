export type FilterValueType =  {
    title: string,
    value: string | number
}
// NOTE : select-one type is as the same as dropdown
export type inputTypes = 'checkbox' | 'range' | 'text' | 'select-one'

export interface ActiveFilter {
    enName?: string
    parent?: string
    type: inputTypes,
    name: string,
    value: FilterValueType[],
}