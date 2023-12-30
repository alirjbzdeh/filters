
<script setup>
const props = defineProps({
    filter: {
        type: Object,
        default: {},
        required: true
    }
})
// ref value
// if option ?
// values.value = filter.option.filter(option => fitler.value.includes(option.value) )
// :
// values.value.push({
//      title: filter.value[0],
//      value: filter.value[0],
// })
</script>

<template>
    
    <span>
        {{ filter.name + ':\xa0' + filter.value.map(vals => vals.value) }}
    </span>
</template>


<style lang="scss" scoped>

</style>