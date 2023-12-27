
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
    <span v-if="filter.type === 'text'">
        {{ filter.name + ':\xa0' + filter.value.map(vals => vals.value) }}
    </span>
</template>
<style lang="scss" scoped>

</style>