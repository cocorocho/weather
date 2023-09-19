<template>
  <img
    v-if="img"
    :src="img"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  weatherCode: number
}>();

const { description, image } = getWeatherDescription(props.weatherCode);
const { img } = usePublicImage(image);
</script>