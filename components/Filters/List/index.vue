
<script setup lang="ts">
import { commafy } from '~/helpers';
import { useProductList } from '~/store/productsList';
import type { ActiveFilter } from '~/helpers/globalTypes'

const productListStore = useProductList()

const clearFilter = (filter: ActiveFilter, index: number) => {
  productListStore.clearFilterItem(index)
  filter.value.map(filterVals => productListStore.clearChildFilters(filterVals))
}

</script>

<template>
   <div class="box-container flex flex-col g12">
    <h3>
        فیلترها
    </h3>
    <div class="flex flex-row wrap g12">
        <div v-for="(filter, index) in productListStore.activeFilters" :key="'filters_list' + index" class="item" @click="clearFilter(filter, index)">
            <FiltersListCheckBox :filter="filter" />
            <span v-if="['select-one','dropdown'].includes(filter.type)">
                {{ filter.name + ':\xa0' + filter.value.map(vals => vals.value) }}
            </span>
            <FiltersListText :filter="filter" :key="filter.value.length + 'text_Filter'" />
            <span v-if="filter.type === 'range'">
                {{ filter.name + ':\xa0' + commafy(filter.value[0].value) + '\xa0_\xa0' + commafy(filter.value[1].value) }}
            </span>
            <span class="close-icon">
                <div class="line line1"></div>
                <div class="line line2"></div>
            </span>
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

/* CSS for close icon */
.close-icon {
  width: 12px; /* Adjust size as needed */
  height: 12px; /* Adjust size as needed */
  position: relative;
  cursor: pointer;
}

.line {
  position: absolute;
  top: 2px;
  width: 100%;
  height: 2px;
  background-color: white; /* Change color as needed */
  transition: transform 0.3s ease;
}

.line1 {
  transform: rotate(45deg);
}

.line2 {
  transform: rotate(-45deg);
}

.close-icon:hover .line {
  background-color: white; /* Change color on hover if desired */
}

</style>