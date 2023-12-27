
<script setup lang="ts">
import { commafy } from '~/helpers';
const props = defineProps({
    filter: {
        type: Object,
        default: {},
        required: true
    }
})
</script>

<template>
    <span>
        {{ filter.name + ':\xa0' + commafy(filter.value[0].value) + '\xa0_\xa0' + commafy(filter.value[1].value) }}
    </span>
</template>


<style lang="scss" scoped>

</style>