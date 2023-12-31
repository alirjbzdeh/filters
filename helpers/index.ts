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
  return '?' + filters.map(filter => {
    const values = filter.value.join(',');
    return `${filter.name}~${values}`;
  })
  .join('&');
}


export function QueryToFilters(query: string) {
  const params = new URLSearchParams(query);
  const result: ActiveFilter[] = [];

  for (const param of params) {
    const name = param[0].split('~')[0] 
    const value = param[0].split('~')[1] 
    result.push(
      {
        name: name,
        value: value.split(',').map(item => decodeURIComponent(item))
      }
    )
  }
  
  return result;
}