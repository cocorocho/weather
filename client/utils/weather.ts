export const getWeatherDescription = (weatherCode: number) : WeatherDescription => {
  const WEATHER_INTERPRETATION_CODE_MAP = {
    0: {
      "description": "weather.clearSky",
      "image": "sun.png",
      "layout": "layout/sea.jpg"
    },
    1: {
      "description": "weather.clearSky",
      "image": "sun.png",
      "layout": "layout/sea.jpg"
    },
    2: {
      "description": "weather.partlyCloudy",
      "image": "sun-clouds.png",
      "layout": "layout/cloudy.jpg"
    },
    3: {
      "description": "weather.partlyCloudy",
      "image": "sun-clouds.png",
      "layout": "layout/cloudy.jpg"
    },
    51: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    53: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    55: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    56: {
      "description": "weather.freezingDrizzle",
      "image": "freezing-rain.png"
    },
    57: {
      "description": "weather.freezingDrizzle",
      "image": "freezing-rain.png"
    },
    61: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    63: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    65: {
      "description": "weather.rain",
      "image": "rain.png",
      "layout": "layout/rain.webp"
    },
    66: {
      "description": "weather.freezingRain",
      "image": "freezing-rain.png"
    },
    67: {
      "description": "weather.freezingRain",
      "image": "freezing-rain.png"
    },
    71: {
      "description": "weather.snow",
      "image": "snow.png"
    },
    73: {
      "description": "weather.snow",
      "image": "snow.png"
    },
    75: {
      "description": "weather.snow",
      "image": "snow.png"
    },
    77: {
      "description": "weather.snow",
      "image": "snow.png"
    },
    80: {
      "description": "weather.rainShower",
      "image": "shower.png",
      "layout": "layout/rain.webp"
    },
    81: {
      "description": "weather.rainShower",
      "image": "shower.png",
      "layout": "layout/rain.webp"
    },
    82: {
      "description": "weather.rainShower",
      "image": "shower.png",
      "layout": "layout/rain.webp"
    },
    85: {
      "description": "weather.snowShower",
      "image": "snow-shower.png"
    },
    86: {
      "description": "weather.snowShower",
      "image": "snow-shower.png"
    },
    95: {
      "description": "weather.thunderstorm",
      "image": "thunderstorm.png"
    },
    96: {
      "description": "weather.thunderStormWithHail",
      "image": "thunderstorm-hail.png"
    },
    99: {
      "description": "weather.thunderStormWithHail",
      "image": "thunderstorm-hail.png"
    },
  }
  
  return useGet(WEATHER_INTERPRETATION_CODE_MAP, weatherCode);
};