
<script setup lang="ts">
const props = defineProps({
    filter: {
        type: Object,
        default: {},
        required: true
    }
})
</script>

<template>
    <span v-if="filter.type === 'checkbox'">
        {{ filter.name + ':\xa0' + filter.value.map(val => val.value) }}
    </span>
</template>


<style lang="scss" scoped>

</style>