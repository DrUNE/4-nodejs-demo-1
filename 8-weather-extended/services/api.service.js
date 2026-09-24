import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (code) => {
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
  }
};

const getWeather = async (...cityList) => {
  const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
  console.log(process.env)
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
  }
  const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json';
  const weatherResponses = await Promise.all(cityList.map(city => {
    const params = new URLSearchParams({
      q: city,
      key: token,
      lang: 'ru_RU.UTF-8'
    });
    const url = `${weatherApiUrl}?${params}`;
    return fetch(url)
  }));

  const data = await Promise.all(weatherResponses.map(response => response.json()));
  return data;
};

export { getWeather, getIcon };
