<template>
  <LayoutHero
    :contentAttrs="layoutAttrs"
  >
    <template #image>
      <Transition mode="out-in">
        <NuxtPicture
          :src="backgroundImage"
          format="webp"
          :key="backgroundImage"
          id="weather-image"
          :img-attrs="{
            class: 'w-full h-screen top-0 fixed'
          }"
        />
      </Transition>
    </template>
    <div class="flex flex-col items-center w-full">
      <div class="max-w-2xl w-full">
        <InputWeatherSelect
          @get-forecast="getForecast"
          class="max-w-2xl p-4 input w-full h-full"
        />
        <section id="weather-data" class="mt-4">
          <template v-if="queriedCity && forecastData">
            <DataWeatherCard
              :cityName="queriedCity?.name"
              :countryName="queriedCity?.countryName"
              :forecastData="forecastData"
              :fetching="fetchingData"
              @toggle-chart="toggleChart"
            />
          </template>
        </section>
      </div>
      <section :id="chartSectionId" class="mt-4 overflow-x-scroll md:overflow-auto">
        <div v-if="showChart && forecastData" class="bg-base-100 rounded-xl p-4 bg-opacity-90">
          <DataWeatherChart
            :forecastData="forecastData.daily"
          />
        </div>
      </section>
    </div>
  </LayoutHero>
</template>

<script setup lang="ts">
const chartSectionId: string = "daily-weather-chart";
const layoutAttrs: Object = {
  class: "w-11/12 md:w-ful"
};
const forecastData = ref();
const queriedCity = ref<City>();
const fetchingData = ref<boolean>(false);
const backgroundImage = ref<string>("layout/sea.jpg");
const showChart = ref<boolean>(false); // TODO set false

const changeWeatherLayout = (weatherCode: number) => {
  const { layout } = getWeatherDescription(weatherCode);

  if (layout && backgroundImage.value !== layout) {
    backgroundImage.value = layout;
  }
}

const toggleChart = () => {
  showChart.value = !showChart.value;
  if (showChart.value === true) {
    const element: HTMLElement | null = document.getElementById(chartSectionId);
    
    if (element) {
      setTimeout(
        () => {
          element.scrollIntoView({ behavior: "smooth" });
        },
        100
      )
    }
  };
}

const getForecast = async (city: City) => {
  queriedCity.value = city;
  fetchingData.value = true;

  const default_params = {
    current_weather: true,
    timezone: getTimezone(),
  }

  const URL = "/forecast"
  const params = {
    ...default_params,
    latitude: city.coordinates.y,
    longitude: city.coordinates.x
  }

  const { data, pending } = await useApiFetch(URL, { params: params });

  // Change layout
  changeWeatherLayout(data.value.current_weather.weathercode);

  forecastData.value = data.value;
  fetchingData.value = false;
}

</script>

<style scoped>
#weather-image {
  @apply
    w-full
    h-screen
    transition-all
    duration-1000
}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>