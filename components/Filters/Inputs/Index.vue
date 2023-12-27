<script setup lang="ts">
import { useProductList } from '~/store/productsList';

const productListStore = useProductList()
const props = defineProps({
    input: {
        type: Object,
        default: {},
        required: true
    }
})

const currentFilter = computed(() => productListStore.activeFilters.findIndex(filter => filter.name === props.input.label))


</script>

<template>
    <FiltersInputsCheckBoxGroup v-if="input.type === 'checkbox-group'" :input="input" :key="productListStore.activeFilters[currentFilter]?.value?.length + input.name" />
    <FiltersInputsCheckBox v-if="input.type === 'checkbox'" :input="input" :key="productListStore.activeFilters[currentFilter]?.value?.length + input.name" />
    <FiltersInputsDropDown v-if="input.type === 'dropdown'" :input="input" :key="productListStore.activeFilters[currentFilter]?.value?.length + input.name" />
    <FiltersInputsText v-if="input.type === 'text'" :input="input" :key="productListStore.activeFilters[currentFilter]?.value?.length + input.name" />
    <FiltersInputsRange v-if="input.type === 'range'" :input="input" :key="productListStore.activeFilters[currentFilter]?.value?.length + input.name" />
</template>

<style lang="scss" scoped>

</style>