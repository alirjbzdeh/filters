import data from '~/helpers/data.js'
import { filterToQuery, QueryToFilters } from '~/helpers/index'
import type { FilterValueType, ActiveFilter } from '~/helpers/globalTypes'



interface ProductListInterface {
  sortedFilters: Record<string, any>[]
  activeFilters: ActiveFilter[]
}

// sort data and add childrens obj into data obj
function sortFilters (selectiveFilter?: Record<string, any>) {
  // replace children strings with theyre own object
  const withChildrenObj = data.map((product, index) => {
    if (product.children) {
      const childrens = product.children.map(name => data.find(innerProduct => innerProduct.name === name))
      return {...product, childrenObjs: childrens}
    } else {
      return product
    }
  })
  // remove child filters
  return withChildrenObj.filter(product => product.parent === null)
} 

function sortActiveFilters (selectiveFilter: Record<string, any>, actualFilterObj: Record<string, any>[]) {
  
  const parentActiveFilters = data.filter(filter=> selectiveFilter.includes(filter.name))
  // step 2 sort by index to match the actualFilterObj and parentActiveFilters with index (use chatGPT)
  // set index in map
  return parentActiveFilters.map(filter => {
    const currentFilter = actualFilterObj.filter(actualFilter =>  actualFilter.name === filter.name)[0]
    
    // return {...filter, value}
    // value
    return {
      enName: filter.name,
      parent: filter.parent,
      type: filter.type.replace('-group', ''), // add group type
      name: filter.label,
      // set value from actualFilterObj[index].value
      value: currentFilter.value.map(actualFilter => {return {
        title: filter.label,
        value: actualFilter
      }})
    }
  })
  
}


export const useProductList = defineStore('profuctList', {
    state: (): ProductListInterface => ({ 
        sortedFilters: sortFilters(),
        activeFilters: []
    }),
    actions: {
      activeFiltersFromUrl (query: string) {
        const filterObj = QueryToFilters(query, '&', '=', ',')
        const filterNames = filterObj.map(filter => filter.name)
        this.activeFilters = sortActiveFilters(filterNames, filterObj)
      },
      setActiveFilter (selectedFilter: ActiveFilter) {
        this.activeFilters.push(selectedFilter)
      },
      // needs to Refactor
      updateActiveFilter (selectedFilter: ActiveFilter, existFilterIndex: number, selectedFilterType: string) {
        // check if active filter is checkbox group or not
        // if value included 

        
        // new Value
        const selectedFilterValue = selectedFilter.value[0]
        // old Value
        const activeFilterValue = this.activeFilters[existFilterIndex].value
        // exsiting sub_filter_item index
        const existTitleIndex = activeFilterValue.findIndex(filterValue => filterValue.title === selectedFilterValue.title)
        // check if needs to be update ro add new
        if (existTitleIndex === -1 && selectedFilterType === 'checkbox') {
          // add new
          activeFilterValue.push(selectedFilterValue)
        } else {
          // if its drop down update directly the first index (becuase its not multi select Item but has multiple items) 
          if (selectedFilterType === 'select-one') {
            activeFilterValue.splice(0, 1)
            activeFilterValue.push(selectedFilterValue)
          } else {
            // otherwise its multi select update active filter value
            this.setActiveFilterValue(selectedFilterValue, existTitleIndex, existFilterIndex)
          }
          
        }
      },
      setActiveFilterValue (selectedFilterValue: FilterValueType, existFilterValueIndex: number, existFilterIndex: number) {
        const activeFilterValue = this.activeFilters[existFilterIndex].value
        if (activeFilterValue[existFilterValueIndex]?.value === selectedFilterValue.value) {
          // remove filter
          this.clearFilterValueItem(existFilterIndex, existFilterValueIndex)
        } else {
          // update filter
          activeFilterValue[existFilterValueIndex]?.value === selectedFilterValue.value
        }
      },
      // refactor needed
      clearChildFilters (clearChildFilters: FilterValueType) {
        this.activeFilters = this.activeFilters.filter(filter => filter.parent !== clearChildFilters.value)
        this.activeFilters = this.activeFilters.filter(filter => filter.enName !== clearChildFilters.value)
        this.activeFilters = this.activeFilters.filter(filter => filter.type !== 'range')
      },
      clearFilterValueItem (filterIndex: number, filterValueIndex: number) {
        const selectedActiveFilter = this.activeFilters[filterIndex]
        this.clearChildFilters(selectedActiveFilter.value[0])
        selectedActiveFilter.value.splice(filterValueIndex, 1)
        if (selectedActiveFilter.value.length === 0) {
          this.clearFilterItem(filterIndex)
        }
      },
      clearFilterItem (filterIndex: number) {
        this.activeFilters.splice(filterIndex, 1);
        navigateTo(''+ filterToQuery(this.activeFilters))
      },
      clearAllFilters () {
        this.activeFilters.splice(0, this.activeFilters.length);
        navigateTo(''+ filterToQuery(this.activeFilters))
      },
      onChange (filter: ActiveFilter) {
        const existFilterIndex = this.activeFilters.findIndex(activeFilter => activeFilter.name === filter.name)
        if (existFilterIndex === -1) {
          this.setActiveFilter(filter)
        } else {
          // just send value and index
          this.updateActiveFilter(filter, existFilterIndex, filter.type)
        }
        navigateTo(''+ filterToQuery(this.activeFilters))
      },
    },
  })