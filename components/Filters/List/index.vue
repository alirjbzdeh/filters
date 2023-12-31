
<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
const productListStore = useProductList()




</script>

<template>
   <div class="flex flex-col g12 filter-list-wrapper w-full">
    <h3>
        فیلترها
    </h3>
        <FiltersListClearAll :class="{'disable opa-0' : productListStore.activeFilters.length <= 0}" />
        <TransitionGroup tag="ul" name="fade" class="filters-wrapper">
            <FiltersListBtn v-for="(filter, index) in productListStore.activeFilters" :key="'filters_list' + index + filter.name" :filter="filter" :index="index" />
        </TransitionGroup>
   </div>
</template>


<style lang="scss" scoped>
.filter-list-wrapper {
    border-right: 1px solid #86A9E1;
    padding: 0 24px;
}
// transition
.filters-wrapper {
    min-height: 45px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    right: 0;
    padding: 0;
    margin: 0;
}

</style>