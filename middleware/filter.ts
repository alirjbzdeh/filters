import { useProductList } from '~/store/productsList';


export default defineNuxtRouteMiddleware((to, from) => {
  const productListStore = useProductList()
  // change fo Full Path By Query
  const query = to.fullPath.replace('/', '')
  productListStore.activeFiltersFromUrl(query)
    
  })
  