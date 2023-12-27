<script setup lang="ts">
// read filters from url
import { useProductList } from '~/store/productsList';

const productListStore = useProductList()
const router = useRouter()

const customQueries = router.options.history.location.replace('/', '')

productListStore.activeFiltersFromUrl(customQueries)


</script>

<template>
    <div class="list-page-container">
        <Filters />
        <!-- List of products -->
        <List />
    </div>
</template>

<style lang="scss" scoped>
.list-page-container {
    padding: 24px;
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 3fr;
}
</style>