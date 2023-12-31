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

definePageMeta({
    middleware: ['filter']
})
</script>

<template>
    <div class="filter-wrapper">
        <form class="flex flex-row box-container" @submit.prevent>
            <div class="flex flex-col g12 inputs-wrapper">
                <component v-for="(inputInfo, index) in parentFilters" :key="productListStore.activeFilters.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
            </div>
            <FiltersList />
        </form>
    </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 24px;
    display: flex;
    flex-direction: column !important;
    position: relative;
    form {
        height: 100%;
    }
}
.inputs-wrapper {
    padding: 12px;
}
</style>