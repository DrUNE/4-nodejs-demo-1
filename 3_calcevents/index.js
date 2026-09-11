const { EventEmitter } = require('node:events');
const { add } = require('./add');
const { multiply } = require('./multiply');
const { subtract } = require('./subtract');
const { divide } = require('./divide');

const [, , a, b, operation] = process.argv;

const ee = new EventEmitter();
const operations = {
  add,
  multiply,
  subtract,
  divide,
};
Object.keys(operations).forEach((operation) =>
  ee.on(operation, (a, b) => ee.emit('result', operations[operation](a, b))),
);
ee.on('result', (result) => console.log(result));

ee.emit(String(operation).toLowerCase(), parseInt(a, 10), parseInt(b, 10));
