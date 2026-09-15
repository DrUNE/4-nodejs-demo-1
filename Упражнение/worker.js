import { isMainThread, parentPort, workerData } from 'node:worker_threads';
import { compute } from './factorial.js';

if (!isMainThread) parentPort.postMessage(compute(workerData));
