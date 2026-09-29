// **Описание**: Реализуйте функцию buildConfigPath(basePath, folderName, fileName), которая объединяет
// три части пути в один итоговый путь с помощью модуля path, а также функцию checkIsAbsolute(pathToCheck),
// которая проверяет, является ли переданный путь абсолютным.
//
// **Входные данные**:
// - Для buildConfigPath: basePath (string), folderName (string), fileName (string) — три части пути
// - Для checkIsAbsolute: pathToCheck (string) — путь для проверки
//
// **Выходные данные**:
// - buildConfigPath возвращает строку — объединённый путь
// - checkIsAbsolute возвращает булево значение (true/false)
//
// **Ограничения**:
// - Все входные параметры — непустые строки
// - Используйте только встроенный модуль path из Node.js
//
// **Примеры**:
// Input: buildConfigPath('home', 'weather-app', 'config.json')
// Output: 'home/weather-app/config.json' (либо с учетом разделителя ОС)
//
// Input: checkIsAbsolute('/usr/local/config.json')
// Output: true
//
// Input: checkIsAbsolute('config.json')
// Output: false

const path = require('path');

function buildConfigPath(basePath, folderName, fileName) {
  // Ваш код здесь
  return path.join(basePath, folderName, fileName);
}

function checkIsAbsolute(pathToCheck) {
  // Ваш код здесь
  return path.isAbsolute(pathToCheck);
}

module.exports = { buildConfigPath, checkIsAbsolute };
