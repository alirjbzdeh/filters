
<script setup lang="ts">
import { commafy } from '~/helpers';
import type { ActiveFilter } from '~/helpers/globalTypes';
import { useProductList } from '~/store/productsFilter';
import data from '~/helpers/data.js'


const productListStore = useProductList()

const props = defineProps({
    filter: {
        type: Object as PropType<ActiveFilter>,
        default: {},
        required: true
    },
    index: {
        type: Number,
        default: 0,
        required: true
    }
})

const selectedFilter = computed(() => data.filter(filter => filter.name === props.filter.name)[0])


const clearFilter = (filter: ActiveFilter, index: number) => {
    productListStore.clearChildren(selectedFilter.value.children)
    productListStore.clearFilterItem(index)
    console.log(productListStore.activeFilters);
    
}

const filterValueTranslator = selectedFilter.value.options?.reduce((result: any, item: any) => {
  result[item.value] = item.title;
  return result;
}, {});


</script>

<template>
<li>
    <button class="item" @click.prevent="clearFilter(filter, index)">
        <ToolsCloseIcon />
        <span v-if="selectedFilter.type === 'range'">
            {{ selectedFilter.label + ':\xa0' + commafy(filter.value[0]) + '\xa0_\xa0' + commafy(filter.value[1]) }}
        </span>
        <span v-else-if="selectedFilter.options">
            {{ selectedFilter.label + ':\xa0' + filter.value.map(val => filterValueTranslator[val]) }}
        </span>
        <span v-else>
            {{ selectedFilter.label + ':\xa0' + filter.value.map(val => val) }}
        </span>
    </button>
</li>
</template>


<style lang="scss">
.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    padding: 8px 12px;
    background-color: transparent;
    border-radius: 8px;
    transition: 0.3s ease;
    color: black;
    font-family: 'Bakh';
    border: 1px solid transparent;
    margin-bottom: 4px;
    &:hover {
        border-color:rgb(226, 68, 68);
        color: rgb(226, 68, 68);
        .line {
            background-color: rgb(226, 68, 68);
        }
    }
}
li {
    list-style: none;
}

</style>