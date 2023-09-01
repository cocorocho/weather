<template>
  <NuxtImg
    :src="image"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  weatherCode: number
}>();

const { description, image } = getWeatherDescription(props.weatherCode);
</script>