import chalk from 'chalk';
import dd from 'dedent-js';

const supportedlang = ['en', 'ru'];
let currentLang = 'en';
const translations = {
  en: {
    unsupportedLangError: (unsupportedLang) =>
      `Unsupported language '${unsupportedLang}' provided`,
    apiKeyNotfoundError: () => `API key must be set, create it by using -t [API_KEY]`,
    tokenSaved: () => `Token saved`,
    tokenNotRecived: () => `Token not received`,
    cityNotRecived: () => `City not received`,
    citySaved: () => `City saved`,
    wrongToken: () => `Wrong token`,
    wrongCity: () => `Wrong city`,
    printHelp: () => dd`
		${chalk.bgCyan(' HELP ')}
		If no parameters are provided, the weather is displayed
		-s [CITY] to set the city
		-h to display help
		-t [API_KEY] to save the token
		-lang [LANG] to set the language (default is en)
		`,
    printWeather: (res, icon) => dd`${chalk.bgYellow(' WEATHER ')} Weather in city  ${res.location.name}
		${icon}  ${res.current.condition.text}
		Temperature: ${res.current.temp_c} ℃ (feels like ${res.current.feelslike_c} ℃)
		Humidity: ${res.current.humidity}%
		Wind speed : ${(res.current.wind_kph * 1000 / 3600).toFixed(2)} м/с
		`
  },
  ru: {
    unsupportedLangError: (unsupportedLang) => `Язык '${unsupportedLang}' не поддерживается`,
    apiKeyNotfoundError: () => `Не задан ключ API, задайте его через команду -t [API_KEY]`,
    tokenSaved: () => `Токен сохранен`,
    tokenNotRecived: () => `Не передан token`,
    cityNotRecived: () => `Не передан город`,
    citySaved: () => `Город сохранён`,
    wrongToken: () => `Неверный токен`,
    wrongCity: () => `Неверный город`,
    printHelp: () => dd`
		${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		-lang [LANG] для установки языка ru или en (по умолчанию en)
		`,
    printWeather: (res, icon) => dd`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.location.name}
		${icon}  ${res.current.condition.text}
		Температура: ${res.current.temp_c} ℃ (ощущается как ${res.current.feelslike_c} ℃)
		Влажность: ${res.current.humidity}%
		Скорость ветра: ${(res.current.wind_kph * 1000 / 3600).toFixed(2)} м/с
		`
    ,
  },
};

export function t() {
  return translations[getCurrentLang()];
}

export function getCurrentLang() {
  return currentLang;
}

export function setLang(lang) {
  if (supportedlang.includes(lang)) {
    return (currentLang = lang);
  }

  throw new Error(t().unsupportedLangError(lang));
}
