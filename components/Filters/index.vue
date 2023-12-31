
<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import data from '~/helpers/data.js'
import type { FilterObj } from '~/helpers/globalTypes'

const productListStore = useProductList()

const checkboxGroup = resolveComponent('FiltersInputsCheckBoxGroup')
const checkbox = resolveComponent('FiltersInputsCheckBox')
const range = resolveComponent('FiltersInputsRange')
const dropdown = resolveComponent('FiltersInputsDropDown')
const text = resolveComponent('FiltersInputsText')



const inputTranslator: Record<string, any> = {
    'checkbox-group': checkboxGroup,
    'checkbox': checkbox,
    'text': text,
    'dropdown': dropdown,
    'select-one': dropdown,
    'range': range,
}

const parentFilters = computed(() => data.filter(filter => filter.parent === null))

</script>

<template>
    <form class="flex flex-col g12 box-container" @submit.prevent>
        <FiltersList :key="productListStore.activeFilters.length" />
        <component v-for="(inputInfo, index) in parentFilters" :key="productListStore.activeFilters.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
    </form>
</template>

<style lang="scss" scoped>

</style>