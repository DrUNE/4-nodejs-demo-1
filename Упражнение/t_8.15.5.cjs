// **Описание**: Реализуйте функцию getConfigDirPath(appName), которая возвращает путь к директории конфигурации
//  приложения внутри домашней директории текущего пользователя ОС, используя модули os и path.
// Также реализуйте функцию getUsername(), которая возвращает имя текущего пользователя операционной системы.
//
// **Входные данные**:
// - Для getConfigDirPath: appName (string) — имя приложения (например 'weather-cli')
// - Для getUsername: входные параметры не требуются
//
// **Выходные данные**:
// - getConfigDirPath возвращает строку (string) — путь вида <домашняя директория>/.config/<appName>, построенный
// с помощью path.join и os.homedir()
// - getUsername возвращает строку (string) — имя текущего пользователя ОС, полученное через os модуль
//
// **Ограничения**:
// - appName — непустая строка без слэшей
// - Используйте только встроенные модули os и path из Node.js
// - Не используйте сторонние библиотеки
//
// **Примеры**:
// Input: getConfigDirPath('weather-cli')
// Output: путь, эквивалентный path.join(os.homedir(), '.config', 'weather-cli') — например, на Linux это может
// быть '/home/john/.config/weather-cli' (точное значение зависит от текущей ОС и пользователя)
//
// Input: getConfigDirPath('my-app')
// Output: путь, эквивалентный path.join(os.homedir(), '.config', 'my-app')
//
// Input: getUsername()
// Output: строка с именем текущего пользователя ОС (например, 'john') — точное значение зависит от системы, на которой выполняется код

const os = require('os');
const path = require('path');

function getConfigDirPath(appName) {
  return path.join(os.homedir(), '.config', appName);
}

function getUsername() {
  return os.userInfo().username;
}

module.exports = { getConfigDirPath, getUsername };
