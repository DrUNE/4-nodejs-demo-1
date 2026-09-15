import { isMainThread, parentPort, workerData } from 'node:worker_threads';
import { countDivisible } from './countDivisible.js';

if (!isMainThread) parentPort.postMessage(countDivisible(workerData));
