<template>
  <Line
    :data="data"
    :options="options"
    :style="{
      height: '400px',
    }"
  />
</template>

<script setup lang="ts">
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Legend,
  CategoryScale,
  LinearScale,
  ChartData,
  LineElement,
  PointElement,
  Colors
} from 'chart.js'
ChartJS.register(Legend, LineElement, CategoryScale, LinearScale, PointElement, Colors)

const props = defineProps<{
  forecastData: any 
}>();

const options = {
  responsive: true,
};

const data = computed((): ChartData => {
  return {
    labels: props.forecastData.time?.map((date: string) : string | undefined => {
      if (date) {
        const options: any = { day: "numeric", weekday: "long" };
        var dateObj = new Date(date);
        const _date = dateObj.toLocaleDateString(undefined, options);

        return _date
      }
    }),
    datasets: [{
      label: "Daily Temperature",
      data: props.forecastData.temperature_2m_min
    }]
  }
});
</script>
