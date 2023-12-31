
<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
const productListStore = useProductList()




</script>

<template>
   <div class="box-container flex flex-col g12">
    <h3>
        فیلترها
    </h3>
    <div class="flex flex-row wrap g12">
        <FiltersListClearAll v-if="productListStore.activeFilters.length > 0" />
        <FiltersListBtn v-for="(filter, index) in productListStore.activeFilters" :key="'filters_list' + index" :filter="filter" :index="index" />
    </div>
   </div>
</template>


<style lang="scss" scoped>
.item {
    border: none !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    padding: 8px 12px;
    background-color: rgb(206, 107, 107);
    border-radius: 8px;
    height: max-content;
    transition: 300ms;
    color: white;
    &:hover {
        background-color: rgb(226, 68, 68);
    }
}



</style>