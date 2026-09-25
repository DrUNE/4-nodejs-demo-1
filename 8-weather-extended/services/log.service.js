import chalk from 'chalk';
import { t } from './lang.service.js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(t().printHelp());
};

const printWeather = (res, icon) => {
  console.log(t().printWeather(res, icon));
};

export { printError, printSuccess, printHelp, printWeather };
