<template>
  <v-select
    class="w-96"
    @search="searchCity"
    @close="clearOptions"
    :options="options"
    :placeholder="$t('helper.searchACity')"
    label="name"
  >
    <template #option="data">
      <p @click="emit('getForecast', data)">
        {{ data.name }}, {{ data.countryName }}
      </p>
    </template>
    <template #no-options="{ search, searching, loading }">
      <p v-if="requestPending" class="loading loading-dots loading-lg"></p>
      <p v-else-if="search.length < minQueryLength">
        {{ $t("warning.minCharsToSearch", { n: minQueryLength }) }}
      </p>
      <p v-else>
        {{ $t("helper.noCityFound") }}
      </p>
    </template>
  </v-select>
</template>

<script setup lang="ts">
const emit = defineEmits(["getForecast"])
const searchDebounceTime: number = 500; // ms
const options = ref();
const requestPending = ref<boolean>(false);
const minQueryLength = 3;

const searchCity = useDebounce(
  async (search: string, loading: boolean) => {
    if (!search || search.length < minQueryLength) return;

    requestPending.value = true;
    const getCityCoordsURL: string = "/q";
    const params = { city: search }

    const { data, pending } = await useApiFetch(getCityCoordsURL, { params: params });
    options.value = data.value;
    requestPending.value = false;
  },
  searchDebounceTime
);

const clearOptions = () => options.value = [];
</script>