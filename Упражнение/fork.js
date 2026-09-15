import { compute } from './factorial.js';
import process from 'node:process';

process.on('message', (msg) => {
  process.send(compute(msg));
  process.disconnect();
});
