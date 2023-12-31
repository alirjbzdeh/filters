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
    <div class="form__group field">
        <label :for="'inputField' + input.name" class="form__label">
            {{ input.label }}
        </label>
        <input v-model="inputVal" type="text" :id="'inputField' + input.name" :name="input.name" class="form__field" :placeholder="input.label" :data-label="input.label" @input="handlerDebouncer">
    </div>
</template>

<style lang="scss" scoped>
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
$purple: #3347B0;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 16px;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: 0.3s ease;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 16px;
    cursor: text;
    top: 20px;
  }
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 14px;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 14px;
    color: $primary;
    font-weight:700;    
  }
  border-color: $purple;
  border-image-slice: 1;
}
/* reset input */
.form__field{
  &:required,&:invalid { box-shadow:none; }
}
</style>