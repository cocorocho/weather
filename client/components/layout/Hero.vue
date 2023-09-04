<template>
  <div class="hero min-h-screen">
    <slot name="image" />
    <div class="hero-overlay bg-opacity-40"></div>
    <div class="hero-content text-center text-neutal-content" v-bind="contentAttrs">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  contentAttrs: object
  }>()
</script>