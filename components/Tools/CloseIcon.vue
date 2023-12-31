<template>
    <span class="close-icon">
        <div class="line line1"></div>
        <div class="line line2"></div>
    </span>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.close-icon {
  width: 12px;
  height: 12px;
  position: relative;
  cursor: pointer;
}

.line {
    position: absolute;
    top: 2px;
    width: 100%;
    height: 2px;
    background-color: black;
    transition: 0.3s ease;
}
.line1 {
    transform: rotate(45deg);
}

.line2 {
    transform: rotate(-45deg);
}

</style>