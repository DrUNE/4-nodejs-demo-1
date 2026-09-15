import { performance as pm, PerformanceObserver } from 'node:perf_hooks';
import { Worker } from 'node:worker_threads';

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const TOTAL_NUMBERS = 300_000;
const CHUNK_SIZE = 50_000;
const NUMBERS_ARRAY = Array.from({ length: TOTAL_NUMBERS });
for (let i = 0; i < TOTAL_NUMBERS; i++) {
  NUMBERS_ARRAY[i] = i;
}

const po = new PerformanceObserver((items) =>
  items.getEntries().forEach(({ name, duration }) => console.log(`${name} ${duration}`)),
);
po.observe({ entryTypes: ['measure'] });

const workerFun = async (array, size) => {
  const arrayChunks = chunkArray(array, size);
  pm.mark(`workers${arrayChunks.length}.start`);
  const result = await Promise.all(
    arrayChunks.map(
      (chunk) =>
        new Promise((resolve, reject) => {
          new Worker('./worker.js', {
            workerData: { divisor: 3, array: chunk },
          })
            .on('message', resolve)
            .once('error', reject)
            .once('exit', (code) => {
              if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
            });
        }),
    ),
  );
  const count = result.reduce((acc, res) => {
    acc += res;
    return acc;
  }, 0);
  pm.mark(`workers${arrayChunks.length}.end`);
  pm.measure(
    `${arrayChunks.length} workers, ${count} total numbers`,
    `workers${arrayChunks.length}.start`,
    `workers${arrayChunks.length}.end`,
  );
  return count;
};

await (async () => {
  await workerFun(NUMBERS_ARRAY, TOTAL_NUMBERS);
  await workerFun(NUMBERS_ARRAY, CHUNK_SIZE);
})();
