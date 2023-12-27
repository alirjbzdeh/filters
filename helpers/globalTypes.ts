export type FilterValueType =  {
    title: string,
    value: string | number
}

export type inputTypes = 'checkbox' | 'range' | 'text' | 'select-one'

export interface ActiveFilter {
    enName?: string
    parent?: string
    type: inputTypes,
    name: string,
    value: FilterValueType[],
}