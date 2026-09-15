import { performance as pm, PerformanceObserver } from 'node:perf_hooks';
import { Worker } from 'node:worker_threads';
import { fork } from 'node:child_process';

const po = new PerformanceObserver((items) =>
  items.getEntries().forEach(({ name, duration }) => console.log(`${name} ${duration}`)),
);
po.observe({ entryTypes: ['measure'] });

const workerFun = async (array) =>
  new Promise((resolve, reject) => {
    pm.mark('worker.start');
    new Worker('./worker.js', {
      workerData: { array },
    })
      .on('message', resolve)
      .once('error', reject)
      .once('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
  }).finally(() => {
    pm.mark('worker.end');
    pm.measure('worker', 'worker.start', 'worker.end');
  });

const forkFun = async (array) =>
  new Promise((resolve, reject) => {
    pm.mark('fork.start');
    const fpr = fork('./fork.js')
      .on('message', resolve)
      .once('error', reject)
      .once('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });

    fpr.send({ array });
  }).finally(() => {
    pm.mark('fork.end');
    pm.measure('fork', 'worker.start', 'worker.end');
  });

await (async () => {
  const result = await workerFun([25, 19, 48, 30]);
  console.log(`Worker done ${result}`);
  const forkResult = await forkFun([25, 19, 48, 30]);
  console.log(`Fork done ${forkResult}`);
})();
