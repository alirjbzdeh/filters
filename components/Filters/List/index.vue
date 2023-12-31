
<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import type { ActiveFilter } from '~/helpers/globalTypes'

const productListStore = useProductList()

const clearFilter = (filter: ActiveFilter, index: number) => {
  filter.value.map(filterVals => productListStore.clearChildFilters(filterVals))
  productListStore.clearFilterItem(index)
}

const RangeInputComponent = resolveComponent('FiltersListRange')
const NotRangeInputComponent = resolveComponent('FiltersListNotRange')

</script>

<template>
   <div class="box-container flex flex-col g12">
    <h3>
        فیلترها
    </h3>
    <div class="flex flex-row wrap g12">
        <FiltersListClearAll v-if="productListStore.activeFilters.length > 0" />
        <div v-for="(filter, index) in productListStore.activeFilters" :key="'filters_list' + index" class="item" @click="clearFilter(filter, index)">
            <component :is=" filter.type === 'range' ? RangeInputComponent : NotRangeInputComponent" :filter="filter" />
            <ToolsCloseIcon />
        </div>
    </div>
   </div>
</template>


<style lang="scss" scoped>
.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    padding: 4px 8px;
    background-color: rgb(206, 107, 107);
    border-radius: 8px;
    height: max-content;
    transition: 300ms;
    &:hover {
        background-color: rgb(226, 68, 68);
    }
    span {
        color: white;
    }
}



</style>