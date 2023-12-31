import { useProductList } from '~/store/productsFilter';


export default defineNuxtRouteMiddleware((to, from) => {
  const productListStore = useProductList()
  // change fo Full Path By Query
  const query = to.fullPath.replace('/', '')
  productListStore.activeFiltersFromUrl(query)
    
  })
  