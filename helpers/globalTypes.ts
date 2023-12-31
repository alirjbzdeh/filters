export type FilterValueType =  {
    title: string,
    value: string | number
}
// NOTE : select-one type is as the same as dropdown
export type inputTypes = 'checkbox' | 'range' | 'text' | 'select-one' | 'checkbox-group'

export interface ActiveFilter {
    parent?: string
    type: inputTypes,
    name: string,
    label: string,
    children: ActiveFilter[],
    options: FilterValueType[],
    value: (string | number)[],
}