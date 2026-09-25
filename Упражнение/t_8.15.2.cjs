// **Описание**: Реализуйте функцию parseArgs(argv), которая принимает массив
// строк (аргументы командной строки, аналогичные process.argv.slice(2)) и преобразует их в объект с парами ключ-значение.
//
// **Входные данные**: argv (array of strings) — массив аргументов, где ключи начинаются
// с одного или нескольких символов '-' (например '-city' или '--city'), а значения — это либо
// строка, следующая за ключом, либо отсутствуют.
//
// **Выходные данные**: объект (object), где ключи — это имена флагов (без символов '-'), а значения — либо
// строка (если следующий элемент массива не является флагом), либо true (если следующий элемент отсутствует
// или тоже является флагом).
//
// **Ограничения**:
// - Массив argv может быть пустым — в этом случае функция должна вернуть пустой объект
// - Ключи в массиве всегда начинаются с одного или нескольких символов '-'
// - Элементы, не начинающиеся с '-', являются значениями предыдущего ключа и не должны обрабатываться как самостоятельные ключи
//
// **Примеры**:
// Input: ['-city', 'Moscow', '-verbose']
// Output: { city: 'Moscow', verbose: true }
//
// Input: ['--units', 'metric', '--lang', 'ru']
// Output: { units: 'metric', lang: 'ru' }
//
// Input: []
// Output: {}
//
// Input: ['-debug', '-city', 'London']
// Output: { debug: true, city: 'London' }

function parseArgs(argv) {
  // Ваш код здесь
  const args = {};
  let currentKey = null;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('-')) {
      currentKey = arg.replace(/^-+/, '');
      if (currentKey) {
        args[currentKey] = true;
      }
    } else {
      if (currentKey) {
        args[currentKey] = arg;
      }
      currentKey = null;
    }
  }

  return args;
}

const testArgs = ['-city', 'Moscow', '-verbose'];

module.exports = { parseArgs };
