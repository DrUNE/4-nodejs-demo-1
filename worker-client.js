import { parentPort, workerData } from 'node:worker_threads';
import { factorial } from './worker/factorial.js';

const compute = ({ array }) => {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  return array.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData));
