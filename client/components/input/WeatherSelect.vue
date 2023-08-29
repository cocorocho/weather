<template>
  <v-select
    class="w-96"
    @search="searchCity"
    :options="options"
    label="name"
  >
    <template #option="data">
      {{ data.name }}, {{ data.countryName }}
    </template>
    <template #no-options="{ search, searching, loading }">
      This is the no options slot.
    </template>
    <template #list-header>
      <button
        type="button"
        class="px-4"
        @click="useUserLocation"
      >
        <span>
          <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
        </span>
        {{  $t("useMyLocation") }}
      </button>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

const searchDebounceTime: number = 500; // ms
const options = ref();
const requestPending = ref<boolean>(false);

const useUserLocation = () => {
  const { coords, locatedAt, error, resume, pause } = useGeolocation()
}

const searchCity = useDebounce(
  async (search: string, loading: boolean) => {
    if (!search) return;

    requestPending.value = true;
    const getCityCoordsURL: string = "/q";
    const params = { city: search }

    const { data, pending } = await useApiFetch(getCityCoordsURL, { params: params });
    options.value = data.value;
    requestPending.value = false;
  },
  searchDebounceTime
)
</script>