import { getKeyValue, TOKEN_DICTIONARY } from './storage.service';
import { t, getCurrentLang } from './lang.service';

const getIcon = (code: number) => {
  switch (code) {
    case 1000:
      return '☀️';
    case 1006:
      return '🌤️';
    case 1003:
      return '🌤️';
    case 1009:
      return '☁️';
    case 1063:
      return '☁️';
    case 1240:
      return '🌧️';
    case 1012:
      return '🌦️';
    case 1015:
      return '🌩️';
    case 1018:
      return '❄️';
    case 1021:
      return '🌫️';
    default:
      return '❓';
  }
};

const weaterExample = {
  "location": {
    "name": "Moscow",
    "region": "Moscow City",
    "country": "Russia",
    "lat": 55.7522,
    "lon": 37.6156,
    "tz_id": "Europe/Moscow",
    "localtime_epoch": 1790609729,
    "localtime": "2026-09-28 18:35"
  },
  "current": {
    "last_updated_epoch": 1790609400,
    "last_updated": "2026-09-28 18:30",
    "temp_c": 14.6,
    "temp_f": 58.3,
    "is_day": 0,
    "condition": {
      "text": "Smog",
      "icon": "//cdn.weatherapi.com/weather/64x64/night/152.png",
      "code": 1039
    },
    "wind_mph": 7.6,
    "wind_kph": 12.2,
    "wind_degree": 10,
    "wind_dir": "N",
    "pressure_mb": 1031,
    "pressure_in": 30.45,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 54,
    "cloud": 0,
    "feelslike_c": 11.2,
    "feelslike_f": 52.2,
    "windchill_c": 13.9,
    "windchill_f": 57,
    "heatindex_c": 14.6,
    "heatindex_f": 58.3,
    "dewpoint_c": 5.3,
    "dewpoint_f": 41.6,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 0,
    "gust_mph": 9.2,
    "gust_kph": 14.8,
    "will_it_rain": 0,
    "chance_of_rain": 2,
    "will_it_snow": 0,
    "chance_of_snow": 0,
    "wetbulb_c": 9.9,
    "wetbulb_f": 49.8
  }
}

export type WeatherData = typeof weaterExample;
const getWeather = async (...cityList: string[]) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error(t().apiKeyNotfoundError());
  }
  const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';
  const weatherList = await Promise.all(
    cityList.map(async (city) => {
      const params = new URLSearchParams({
        q: city,
        key: token,
        lang: getCurrentLang(),
      });
      const url = `${weatherApiUrl}?${params.toString()}`;
      const resp = await fetch(url);
      if (!resp.ok) {
        const { status } = resp;
        if (status == 404) {
          throw new Error(t().wrongCity());
        } else if (status == 401) {
          throw new Error(t().wrongToken());
        } else {
          throw new Error(t().apiError());
        }
      }
      return resp.json() as Promise<WeatherData>;
    }),
  );

  return weatherList;
};

export { getWeather, getIcon };
