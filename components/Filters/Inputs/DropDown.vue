<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import type { FilterObj } from '~/helpers/globalTypes'
import data from '~/helpers/data.js'
const productListStore = useProductList()

// props
const props = defineProps({
    input: {
        type: Object as PropType<FilterObj>,
        default: {},
        required: true
    }
})

const selectedItem = ref()

const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.name)

const updateDropDownValue = () => {
    
    const activeFilter = productListStore.activeFilters[filterIndex]?.value[0]
    if (activeFilter) {
        selectedItem.value.value = activeFilter
    } else {
        selectedItem.value.value = 'clear'
    }
}

const handleChange = (e: any) => {
    productListStore.clearChildren(props.input.children)
    if (e.target.value === 'clear') {
        productListStore.clearFilterItem(filterIndex)
    } else {
        productListStore.onChange({
            name: props.input.name,
            value: [e.target.value]
        })
    }
    updateDropDownValue()
}






onMounted(() => {
    updateDropDownValue()
})

const inputChilds = computed(() => data.filter(filter => props.input.children?.includes(filter.name)))

const relatetoValueChilds = computed(() => inputChilds.value.filter(filter => [selectedItem.value?.value, 'price-range'].includes(filter.name)))



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
    'range': range,
}

</script>

<template>
    <div class="flex flex-col dropdown-container">
        <h4>
            {{ input.label }}
        </h4>
        <select class="dropdown-content" :id="'select_option_'+input.name" ref="selectedItem" :data-label="input.label" @change="handleChange">
            <option
                name="همه"
                value="clear"
            >
                همه
            </option>
            <option 
                v-for="(item, index) in input.options"
                :name="item.title"
                :value="item.value"
                :key="index + 'dropdown_option'"
            >
                {{ item.title }}
            </option>
        </select>
    </div>
    <div v-if="relatetoValueChilds.length > 0 && (!!selectedItem?.value && selectedItem?.value !== 'clear')" class="mr-2">
        <component v-for="(inputInfo, index) in relatetoValueChilds" :key="selectedItem.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
    </div>
</template>

<style lang="scss" scoped>
.dropdown-container {
    border-bottom: 1px solid #86A9E1;
    padding-bottom: 16px;
    width: 100%;
}
.dropdown {
    width: max-content;
}
.dropdown-content {
    max-width: 280px;
    display: flex;
    flex-direction: column;
    span {
        padding: 4px;
        color: #273469;
        cursor: pointer;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
    }
    .active-dropdown-item {
        background-color: #D3D3D3;
    }
}


/* Style for the options within the select dropdown */
option {
  background-color: #fff; /* Background color of options */
  color: #333; /* Text color of options */
  padding: 8px;
}

/* Style for the selected option */
option:checked {
  background-color: #f0f0f0; /* Background color of the selected option */
  color: #333; /* Text color of the selected option */
}
</style>