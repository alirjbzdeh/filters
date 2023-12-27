import type { ActiveFilter } from '~/helpers/globalTypes'


export function debounce(func: Function, delay: number) {
    let timeoutId: ReturnType<typeof setInterval>;
  
    return function() {
      const context = this;
      const args = arguments;
  
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
}
export function commafy( num: number | string ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
export function filterToQuery(filters: ActiveFilter[]) {
  const keyValueFilters = filters.map(filter => {
    return {
      key: filter.enName,
      value: filter.value
    }
  })
  const finalQuery = keyValueFilters.map((filter, index) => `${index===0 ? '?' : '&'}${filter.key}=${filter.value.map((subFilter, j) => subFilter.value)}`)
  return finalQuery.join("")
}
export function QueryToFilters(query: string, filterSeprator: string, valueSeprator: string, subValueSeprator: string) {
  const queryStr = query.replace('?', '')
  const filtersStr = queryStr.split(filterSeprator)

  const keyValFilter = filtersStr.map((filter, index) => {
    return {
      name: filter.split(valueSeprator)[0],
      value: filter.split(valueSeprator)[1]
    }
    
  })
  return keyValFilter.map(filter => {
    return {
      name: filter.name,
      value: filter.value?.split(subValueSeprator)
    }
  })
}