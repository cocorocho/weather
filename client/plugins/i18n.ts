import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en: {
        "useMyLocation": "Use my location",
        "weather": {
          "clearSky": "clear sky",
          "mainlyClear": "mainly clear ",
          "partlyCloudy": "partly cloudy",
          "fog": "fog",
          "freezingDrizzle": "freezing drizzle",
          "rain": "rain",
          "freezingRain": "freezing rain",
          "snow": "snow",
          "rainShower": "rain shower",
          "snowShower": "snow shower",
          "thunderstorm": "thunderstorm",
          "thunderStormWithHail": "thunderstorm with hail"
        },
        "helper": {
          "searchACity": "Search a city",
          "noCityFound": "No cities found"
        },
        "warning": {
          "minCharsToSearch": "Type at least {n} characters to search"
        }
      }
    }
  })

  vueApp.use(i18n)
})