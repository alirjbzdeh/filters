import data from '~/helpers/data.js'
import { filterToQuery, QueryToFilters } from '~/helpers/index'
import type { ActiveFilter } from '~/helpers/globalTypes'



interface ProductListInterface {
  activeFilters: ActiveFilter[]
}

export const useProductList = defineStore('profuctList', {
    state: (): ProductListInterface => ({ 
      activeFilters: []
    }),
    actions: {
      activeFiltersFromUrl (query: string) {
        this.activeFilters = QueryToFilters(query)
      },
      setActiveFilter (selectedFilter: ActiveFilter) {
        this.activeFilters.push(selectedFilter)
      },
      updateActiveFilter (newFilter: ActiveFilter, existFilterIndex: number) {
        const newFilterObj = data.find(filter => filter.name === newFilter.name)
        if (newFilterObj?.type === 'checkbox-group') {
          this.activeFilters[existFilterIndex].value.push(newFilter.value[0])
        } else {
          this.activeFilters[existFilterIndex].value = newFilter.value
        }
      },
      clearFilterItem (filterIndex: number) {
        this.activeFilters.splice(filterIndex, 1);
        navigateTo(filterToQuery(this.activeFilters))
      },
      clearCheckboxGroupFilterSubItem (filterIndex: number, subFilterIndex: number) {
        this.activeFilters[filterIndex]?.value.splice(subFilterIndex, 1);
        if (this.activeFilters[filterIndex]?.value.length < 1) {
          this.clearFilterItem(filterIndex)
        }
        navigateTo(filterToQuery(this.activeFilters))
      },
      clearAllFilters () {
        this.activeFilters.splice(0, this.activeFilters.length);
        navigateTo(filterToQuery(this.activeFilters))
      },
      clearChildren (childsName: string[] | null) {
        if (childsName) {
          this.activeFilters = this.activeFilters.filter(filter => !childsName.includes(filter.name))
        }
      },
      onChange (newFilter: ActiveFilter) {
        const existFilterIndex: number = this.activeFilters.findIndex(activeFilter => activeFilter.name === newFilter.name)
        if (existFilterIndex === -1) {
          this.setActiveFilter(newFilter)
        } else {
          this.updateActiveFilter(newFilter, existFilterIndex)
        }
        navigateTo(filterToQuery(this.activeFilters))
      },
    },
  })