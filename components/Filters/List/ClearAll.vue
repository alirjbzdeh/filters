<template>
<li class="transition-delay-300">
    <button class="delete-all-item item" @click.prevent="productListStore.clearAllFilters">
        <ToolsCloseIcon />
        <span>
            حذف همه
        </span>
    </button>
</li>
</template>

<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';

const productListStore = useProductList()
</script>

<style lang="scss">
.transition-delay-300 {
    transition: 300ms;
    transition-delay: 300ms !important;
}
.delete-all-item {
        border:1px solid rgb(226, 68, 68) !important;
        color: rgb(226, 68, 68) !important;
        .line {
            background-color: rgb(226, 68, 68);
        }
}
</style>