#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { setLang, t } from './services/lang.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError(t().tokenNotRecived());
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(t().tokenSaved());
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError(t().cityNotRecived());
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(t().citySaved());
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weatherList = await getWeather(...city.split(','));
    weatherList.forEach((weather) =>
      printWeather(weather, getIcon(weather.current.condition.code)),
    );
  } catch (e) {
    if (e?.response?.status == 404) {
      printError(t().wrongCity());
    } else if (e?.response?.status == 401) {
      printError(t().wrongToken());
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.lang) {
    setLang(args.lang);
  }
  return getForcast();
};

await initCLI();
