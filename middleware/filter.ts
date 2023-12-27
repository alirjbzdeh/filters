import { useProductList } from '~/store/productsList';


export default defineNuxtRouteMiddleware((to, from) => {
  const productListStore = useProductList()
  const query = to.fullPath.replace('/', '')
  productListStore.activeFiltersFromUrl(query)
    
  })
  