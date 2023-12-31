<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';
import type { FilterValueType, ActiveFilter } from '~/helpers/globalTypes'
const productListStore = useProductList()

const props = defineProps({
    input: {
        type: Object as PropType<ActiveFilter>,
        default: {},
        required: true
    }
})

const handleChange = (item: FilterValueType) => {
    
  productListStore.onChange({
    ...props.input,
    value: [item.value]
  })
}

const checkboxes = ref()

const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.label)

const checkSelectedItems = () => {
    const filterValues = productListStore.activeFilters[filterIndex].value
    checkboxes.value.map((checkbox: any) => {
        filterValues.includes(checkbox.dataset.value) ? checkbox.checked = true : checkbox.checked = false
    })
}

onMounted(() => {
    checkSelectedItems()
})

</script>

<template>
    <div class="flex flex-col g12">
        <h4>
            {{ input.label }}
        </h4>
        <div class="flex flex-row wrap items-center checkboxs-container">
            <div v-for="(item, index) in input.options" :key="index + 'checkbox-items'" class="checkbox-container">
                <input
                    ref="checkboxes"
                    type="checkbox"
                    :id="'checkbox_group_' + item.title"
                    class="styled-checkbox"
                    :name="input.name"
                    :data-label="input.label"
                    :data-value="item.value"
                    @click="handleChange(item)"
                >
                <label :for="'checkbox_group_' + item.title" class="checkbox-label">
                    {{ item.title }}
                </label>
            </div>
        </div>
    </div>
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