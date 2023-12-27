
<script setup lang="ts">
import { useProductList } from '~/store/productsList';

const productListStore = useProductList()

</script>

<template>
    <form class="flex flex-col g12 box-container" @submit.prevent>
        <FiltersList :key="productListStore.activeFilters.length" />
        <FiltersInputs v-for="(inputInfo, index) in productListStore.sortedFilters" :key="index + 'input-container'" :input="inputInfo" />
    </form>
</template>

<style lang="scss" scoped>

</style>