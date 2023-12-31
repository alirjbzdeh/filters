<template>
    <div class="item" @click="productListStore.clearAllFilters(filter, index)">
        <span>
            حذف همه
        </span>
        <ToolsCloseIcon />
    </div>
</template>

<script setup lang="ts">
import { useProductList } from '~/store/productsFilter';

const productListStore = useProductList()
</script>

<style scoped lang="scss">
.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    padding: 4px 8px;
    background-color: rgb(206, 107, 107);
    border-radius: 8px;
    height: max-content;
    transition: 300ms;
    &:hover {
        background-color: rgb(226, 68, 68);
    }
    span {
        color: white;
    }
}


</style>