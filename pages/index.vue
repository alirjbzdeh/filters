<script setup lang="ts">

definePageMeta({
  middleware: ['filter']
})

</script>

<template>
    <div class="list-page-container">
        <Filters />
        <!-- List of products -->
        <List />
    </div>
</template>

<style lang="scss" scoped>
.list-page-container {
    padding: 24px;
    display: grid;
    gap: 24px;
    grid-template-columns: 1fr 2fr;
}
@media only screen and (max-width: 1250px) {
    .list-page-container {
        display: flex;
        flex-direction: column !important;
    }

}
</style>