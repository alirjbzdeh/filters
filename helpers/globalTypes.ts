export type FilterValueType =  {
    title: string,
    value: string | number
}
// NOTE : select-one type is as the same as dropdown
export type inputTypes = 'checkbox' | 'range' | 'text' | 'select-one' | 'checkbox-group' | 'dropdown'

export interface FilterObj {
    type: inputTypes,
    name: string,
    label: string,
    parent: string | null,
    children: string[] | null,
    options: FilterValueType[] | null
}
export interface ActiveFilter {
    name: string,
    value: (string | number)[],
}