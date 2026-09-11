const { add } = require('./add');
const { multiply } = require('./multiply');
const { subtract } = require('./subtract');
const { divide } = require('./divide');

const [, , a, b, operation] = process.argv;

const operations = {
  add,
  multiply,
  subtract,
  divide,
};

const op = operations[String(operation).toLowerCase()];
if (op) {
  console.log(op(parseInt(a, 10), parseInt(b, 10)));
}
