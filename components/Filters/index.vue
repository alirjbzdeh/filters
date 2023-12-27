
<script setup lang="ts">
import { useProductList } from '~/store/productsList';

const productListStore = useProductList()

const checkboxGroup = resolveComponent('FiltersInputsCheckBoxGroup')
const checkbox = resolveComponent('FiltersInputsCheckBox')
const range = resolveComponent('FiltersInputsRange')
const dropdown = resolveComponent('FiltersInputsDropDown')
const text = resolveComponent('FiltersInputsText')



const inputTranslator = {
    'checkbox-group': checkboxGroup,
    'checkbox': checkbox,
    'text': text,
    'dropdown': dropdown,
    'range': range,
}


</script>

<template>
    <form class="flex flex-col g12 box-container" @submit.prevent>
        <FiltersList :key="productListStore.activeFilters.length" />
        <component v-for="(inputInfo, index) in productListStore.sortedFilters" :key="productListStore.activeFilters.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
    </form>
</template>

<style lang="scss" scoped>

</style>