const fs = require('fs').promises;

// **Описание**: Реализуйте асинхронную функцию saveWeatherPreference(key, value, filePath), которая
// сохраняет пользовательскую настройку CLI-приложения прогноза погоды (например, единицы измерения или город по умолчанию)
// в JSON-файл. Если файл по указанному пути уже существует и содержит корректные данные, функция должна обновить (или добавить)
// переданный ключ, сохранив остальные существующие данные без изменений. Если файл не существует, функция
// должна создать новый файл с единственным переданным ключом.
//
// **Входные данные**:
// - key (string) — название настройки, непустая строка
// - value (string | number | boolean) — значение настройки
// - filePath (string) — путь к JSON-файлу, где хранятся настройки
//
// **Выходные данные**:
// - Promise, который разрешается без значения (undefined) после успешной записи файла
// - Если файл по указанному пути не существует — это НЕ ошибка, функция должна создать новый файл
// - Если файл существует, но содержит невалидный JSON — Promise должен быть отклонён (reject) с ошибкой
//
// **Ограничения**:
// - Используйте только встроенный модуль fs (fs.promises) из Node.js
// - key — непустая строка
// - value — примитивное значение (строка, число или булево значение)
// - Существующие в файле ключи, кроме обновляемого, должны остаться без изменений
//
// **Примеры**:
// Input: saveWeatherPreference('units', 'metric', './settings.json') — файл settings.json отсутствует
// Output: Promise выполняется успешно; создаётся файл settings.json с содержимым { "units": "metric" }
//
// Input: saveWeatherPreference('city', 'Moscow', './settings.json') — файл settings.json существует с содержимым { "units": "metric" }
// Output: Promise выполняется успешно; файл settings.json обновляется до содержимого { "units": "metric", "city": "Moscow" }
//
// Input: saveWeatherPreference('units', 'imperial', './settings.json') — файл settings.json существует с содержимым { "units": "metric", "city": "Moscow" }
// Output: Promise выполняется успешно; файл settings.json обновляется до содержимого { "units": "imperial", "city": "Moscow" }

async function saveWeatherPreference(key, value, filePath) {

  let parsedData = {};

  try {
    const data = await fs.readFile(filePath, 'utf8');
    parsedData = JSON.parse(data);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  parsedData[key] = value;
  await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2));
}

module.exports = { saveWeatherPreference };
