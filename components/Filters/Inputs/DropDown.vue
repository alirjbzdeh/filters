<script setup lang="ts">
import { useProductList } from '~/store/productsList';
import type { FilterValueType } from '~/helpers/globalTypes'
const productListStore = useProductList()

// props
const props = defineProps({
    input: {
        type: Object,
        default: {},
        required: true
    }
})

const selectedItem = ref<FilterValueType[]>([])

// its not working in handlechange func for some reason
const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.label)

const handleChange = (e: any) => {
    const item = props.input.options.find((option: FilterValueType) => e.target.value.toString() === option.value.toString())
    if (selectedItem.value.length > 0) {
        productListStore.clearChildFilters(selectedItem.value[0])
    }
    if (item) {
        selectedItem.value.splice(0, 1)
        selectedItem.value.push(
        {
            title: item.title,
            value: item.value
        }
        )
        productListStore.onChange({
            enName: props.input.name,
            parent: props.input.parent,
            type: 'select-one',
            name: props.input.label,
            value: selectedItem.value
        })
    } else {
        productListStore.clearFilterItem(filterIndex)
    }
}





const updateDropDownValue = () => {
    const activeFilter = productListStore.activeFilters[filterIndex]
    
    if (activeFilter?.name === props.input.label) {
        selectedItem.value.push(activeFilter.value[0])
    }
}
onMounted(() => {
    updateDropDownValue()
})


const childInputs = computed(() => props.input.childrenObjs.filter((inputChild: any) => [selectedItem.value[0].value, 'price-range'].includes(inputChild.name)))



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
    <div class="flex flex-col dropdown-container">
        <h4>
            {{ input.label }}
        </h4>
        <select class="dropdown-content" :id="'select_option_'+input.name" :data-label="input.label" @change="handleChange" :value="selectedItem[0]?.value ? selectedItem[0]?.value : 'clear'">
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
    <div class="sub-filter-container" v-if="input.childrenObjs?.length > 0 && selectedItem.length > 0">
        <component v-for="(inputInfo, index) in childInputs" :key="selectedItem.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
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