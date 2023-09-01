<template>
  <div class="card shadow-xl image-full">
    <div class="card-body">
      <div v-if="fetching"
        class="animate-pulse"
      >
        <div class="flex gap-x-4">
          <div class="basis-2/5">
            <div class="h-4 bg-slate-700 rounded-lg"></div>
          </div>
          <div class="basis-3/5">
            <div class="rounded-lg bg-slate-700 h-56"></div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="grid grid-cols-3 gap-2">
          <div class="h-4 bg-slate-700 rounded-lg"></div>
          <div class="h-4 bg-slate-700 rounded-lg"></div>
          <div class="h-4 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
      <div v-else>
        <div class="flex">
          <div class="basis-2/5">
            <div class="h-full font-semibold flex flex-col justify-between prose">
              <h1>
                {{ forecastData.current_weather.temperature }} {{ forecastData.daily_units.temperature_2m_min }}
              </h1>
              <div>
                <p class="my-0">
                  {{ dayName }}
                </p>
                <h3 class="my-0">
                  {{ day }} {{ monthName }}
                </h3>
              </div>
            </div>
          </div>
          <div class="basis-3/5 px-4">
            <WeatherIcon
              class="my-0"
              :weatherCode="forecastData.current_weather.weathercode"
            />
            <div class="prose">
              <h3 class="inline">
                {{ cityName }}<span>, </span>
              </h3>
              <p class="inline">
                {{ countryName }}
              </p>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex justify-around">
          <div class="sub-data">
            <font-awesome-icon :icon="['fas', 'wind']" />
            <p>
              {{ forecastData.current_weather.windspeed }} kmh
            </p>
          </div>
          <div class="sub-data">
            <font-awesome-icon :icon="['fas', 'umbrella']" />
            <p>
              {{ forecastData.daily.rain_sum[0] }} %
            </p>
          </div>
          <div class="sub-data">
            <font-awesome-icon :icon="['fas', 'droplet']" />
            <p>
              {{ forecastData.hourly.relativehumidity_2m[0] }}
              {{ forecastData.hourly_units.relativehumidity_2m }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  cityName: string,
  countryName: string,
  forecastData: any,
  fetching: boolean
}>();

const { day, dayName, monthName } = useDate(props.forecastData.current_weather.time);
</script>

<style scoped>
.card {
  @apply
    w-10/12
    sm:w-96
    lg:w-[30rem]
}

.sub-data p {
  @apply
    font-semibold
    text-lg
}

.sub-data svg {
  @apply
    h-8
}

.card {
  animation: createBox .25s;
}

@keyframes createBox {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>