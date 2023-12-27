<script setup lang="ts">
import { commafy, debounce } from '~/helpers'
import { useProductList } from '~/store/productsList';

const props = defineProps({
    input: {
        type: Object,
        default: {},
        required: true
    }
})



const productListStore = useProductList()

const filterIndex = productListStore.activeFilters.findIndex(filter => filter.name === props.input.label)


const handleChange = () => {
  productListStore.onChange({
    enName: props.input.name,
    parent: props.input.parent,
    type: 'range',
    name: props.input.label,
    value: [
        {
            title: 'min',
            value: data.value.slider1
        },
        {
            title: 'max',
            value: data.value.slider2
        }
    ]
  })
}



// range input
const data = ref({
    slider1: props.input.options[0].value,
    slider2: props.input.options[1].value,
})

const slider1Ref = ref<any>(null)
const slider2Ref = ref<any>(null)
const sliderTrackRef = ref<any>(null)

const fillColor = () => {
    let percent1 = (data.value.slider1 / slider1Ref.value.max) * 100
    let percent2 = (data.value.slider2 / slider1Ref.value.max) * 100
    sliderTrackRef.value.style.background = `linear-gradient(to left, #f7f7f7 ${percent1}%, #EC3F2C ${percent1}%, #EC3F2C ${percent2}%, #f7f7f7 ${percent2}%)`
}

const handleChangeDebouncer = debounce(handleChange, 500)

const slideOne = () => {
    const slidesGap = Number(data.value.slider2) - Number(data.value.slider1)
    if (slidesGap <= 0) {
        data.value.slider1 = Number(data.value.slider2)
    }
    fillColor()
    handleChangeDebouncer()
}
const slideTwo = () => {
    const slidesGap = Number(data.value.slider2) - Number(data.value.slider1)
    if (slidesGap <= 0) {
        data.value.slider2 = Number(data.value.slider1)
    }
    fillColor()
    handleChangeDebouncer()
}

const getInputValFromStore = () => {
    if (productListStore.activeFilters[filterIndex]) {
        data.value.slider1 = productListStore.activeFilters[filterIndex]?.value[0]?.value
        data.value.slider2 = productListStore.activeFilters[filterIndex]?.value[1]?.value
    }
}

const slidersInit = () => {
    const slidesGap = Number(data.value.slider2) - Number(data.value.slider1)
    if (slidesGap <= 0) {
        data.value.slider1 = Number(data.value.slider2)
    }
    fillColor()
    const slidesGap2 = Number(data.value.slider2) - Number(data.value.slider1)
    if (slidesGap <= 0) {
        data.value.slider2 = Number(data.value.slider1)
    }
    fillColor()
}
onMounted(() => {
    getInputValFromStore()
    slidersInit()
})

</script>

<template>
    <h4>
        {{ input.label }}
    </h4>
    <div class="columnd g4 w100" @click.stop>
        <div class="input-range-wrapper">
            <div class="slider-track" ref="sliderTrackRef" />
            <input v-model="data.slider1" ref="slider1Ref" id='input_a' type='range' :min="0"
                :max="input.options[1].value" @input="slideOne" :data-max="data.slider2" :data-min="data.slider1" :data-label="input.label" />
            <input v-model="data.slider2" ref="slider2Ref" id='input_b' type='range' :min="0"
                :max="input.options[1].value" @input="slideTwo" :data-max="data.slider2" :data-min="data.slider1" :data-label="input.label" />
        </div>
        <div class="flex flex-row items-center justify-between w-full pt-1">
            <span class="f14-400 c-grey3">
                از
            </span>
            <span class="f14-400 c-grey3">
                تا
            </span>
        </div>
        <div class="flex flex-row items-center justify-between w-full">
            <span class="f12-700 c-grey1">
                {{ commafy(data.slider1) + 'تومان' }}
            </span>
            <span class="f12-700 c-grey1">
                {{ commafy(data.slider2) + 'تومان' }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// input range style 
.input-range-wrapper {
    position: relative;
    width: 100%;
}

@mixin thumb() {
    background: currentcolor;
    border: none;
    /* get rid of Firefox thumb border */
    background: linear-gradient(226.98deg, #EC3F2C -2.95%, #FBE51C 305.28%);
    border-radius: 2px;
    transform: rotate(-45deg) translateY(0px);
    pointer-events: auto;
    /* catch clicks */
    width: 10px;
    height: 10px;
    cursor: pointer;
    pointer-events: auto;
}

input[type='range'] {

    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb,
    & {
        -webkit-appearance: none;
    }

    /* same as before */
    background: none;
    /* get rid of white Chrome background */
    color: #000;
    font: inherit;
    /* fix too small font-size in both Chrome & Firefox */
    margin: 0;
    pointer-events: none;
    /* let clicks pass through */
    position: absolute;
    width: 100%;
    height: 8px;

    &::-webkit-slider-thumb {
        @include thumb;
    }

    &::-moz-range-thumb {
        @include thumb;
    }
}

.slider-track {
    width: 100%;
    height: 8px;
    background-color: #D3D3D3;
    position: absolute;
    border-radius: 8px;
}


</style>