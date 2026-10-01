import chalk from 'chalk';
import { t } from './lang.service';
import { type WeatherData } from './api.service';

const printError = (error: string) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message: string) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(t().printHelp());
};

const printWeather = (res: WeatherData, icon: string) => {
  console.log(t().printWeather(res, icon));
};

export { printError, printSuccess, printHelp, printWeather };
