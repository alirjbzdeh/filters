<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import type { FilterObj } from '~/helpers/globalTypes'
import { debounce } from '~/helpers'

const productListStore = useProductList()

const props = defineProps({
    input: {
        type: Object as PropType<FilterObj>,
        default: {},
        required: true
    }
})
const inputVal = ref<string | number | null>(null)
const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.name)

const getInputValFromStore = () => {
  inputVal.value = productListStore.activeFilters[filterIndex]?.value[0]
}


const handleChange = (e: any) => {
  if (filterIndex !== -1) {
    productListStore.clearFilterItem(filterIndex)
  }
  if (inputVal.value) {
    productListStore.onChange({
        name: props.input.name,
        value: [inputVal.value]
    })
  }
}


const handlerDebouncer = debounce(handleChange, 350)




onMounted(() => {
  getInputValFromStore()
})

</script>

<template>
    <div class="text-input-container">
        <label :for="'inputField' + input.name">
            {{ input.label }}
        </label>
        <input v-model="inputVal" type="text" :id="'inputField' + input.name" :name="input.name" class="styled-input" :placeholder="input.label" :data-label="input.label" @input="handlerDebouncer">
    </div>
</template>

<style lang="scss" scoped>
.text-input-container {
    border-bottom: 1px solid #86A9E1;
    padding-bottom: 16px;
}

.styled-input {
  padding: 10px;
  border: 1px solid #D3D3D3;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
}

.styled-input:focus {
  outline: none;
  border-color: #3D6CB9;
}

/* Label styles */
label {
  color: #273469;
  margin-bottom: 5px;
  display: block;
  font-size: 14px;
  font-weight: bold;
}
</style>