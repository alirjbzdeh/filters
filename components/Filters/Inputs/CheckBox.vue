<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import type { FilterObj } from '~/helpers/globalTypes'
import data from '~/helpers/data.js'

const productListStore = useProductList()

const props = defineProps({
    input: {
        type: Object as PropType<FilterObj>,
        default: {},
        required: true
    }
})

const isChecked = ref<boolean>(false)
const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.name)

const readInputValueFromStore = () => {
    if (productListStore.activeFilters[filterIndex]) {
        isChecked.value = true
    }
}

const handleChange = () => {
    productListStore.clearChildren(props.input.children)
    if(filterIndex !== -1) {
        productListStore.clearFilterItem(filterIndex)
    }
    if (isChecked.value) {
        productListStore.onChange({
            name: props.input.name,
            value: [props.input.options![0].value.toString()]
        })
    }
}





onMounted(() => {
    readInputValueFromStore()
})


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

const inputChilds = computed(() => data.filter(filter => props.input.children?.includes(filter.name)))



</script>

<template>
    <div class="flex flex-col g12">
        <h4>
            {{ input.label }}
        </h4>
        <div class="flex flex-row wrap items-center checkboxs-container">
            <div class="checkbox-container">
                <input
                    v-model="isChecked"
                    type="checkbox"
                    :id="'checkbox_' + input.name"
                    class="styled-checkbox"
                    :name="input.name"
                    :data-label="input.label"
                    @change="handleChange"
                >
                <label :for="'checkbox_' + input.name" class="checkbox-label">
                    {{ input.options ? input.options[0].title : '' }}
                </label>
            </div>
        </div>
    </div>
    <transition name="fade">
        <div v-if="inputChilds.length > 0 && isChecked" class="sub-filter">
            <component v-for="(inputInfo, index) in inputChilds" :key="inputChilds.length + index + 'input-container'" :input="inputInfo" :is="inputTranslator[inputInfo.type]" />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.checkboxs-container {
    row-gap: 8px;
    column-gap: 64px;
    border-bottom: 1px solid #86A9E1;
    margin-bottom: 16px;
}
.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.styled-checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #3D6CB9;
  border-radius: 4px;
  cursor: pointer;
  &:checked {
      background-color: #86A9E1;
  }
}

.checkbox-label {
  font-family: 'Bakh';
  font-size: 16px;
  font-weight: 700;
  color: #273469;
  cursor: pointer;
}
</style>