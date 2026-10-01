#!/usr/bin/env node
import { getArgs } from 'helpers/args';
import { getWeather, getIcon } from 'services/api.service';
import { printHelp, printSuccess, printError, printWeather } from 'services/log.service';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from 'services/storage.service';
import { setLang, t } from 'services/lang.service';

const saveToken = async (token: string) => {
  if (!token.length) {
    printError(t().tokenNotRecived());
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(t().tokenSaved());
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(String(e));
    }
  }
};

const saveCity = async (city: string) => {
  if (!city.length) {
    printError(t().cityNotRecived());
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(t().citySaved());
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(String(e));
    }
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
    if (e instanceof Error) {
      printError(e.message);
    } else {
      printError(String(e));
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (typeof args.s === 'string') {
    return saveCity(args.s);
  }
  if (typeof args.t === 'string') {
    return saveToken(args.t);
  }
  if (typeof args.lang === 'string') {
    setLang(args.lang);
  }
  return getForcast();
};

await initCLI();
