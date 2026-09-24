import chalk from 'chalk';
import dd from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
  console.log(
    dd`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  );
};

const printWeather = (res, icon) => {
  console.log(
    dd`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.location.name}
		${icon}  ${res.current.condition.text}
		Температура: ${res.current.temp_c} ℃ (ощущается как ${res.current.feelslike_c} ℃)
		Влажность: ${res.current.humidity}%
		Скорость ветра: ${(res.current.wind_kph * 1000 / 3600).toFixed(2)} м/с
		`
  );
};

export { printError, printSuccess, printHelp, printWeather };
