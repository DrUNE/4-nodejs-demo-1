import { EventEmitter } from 'node:events';

class MyEmmitter extends EventEmitter {}

const myEmitter = new MyEmmitter();

const onConnected = () => {
  console.log('DB connected');
};
myEmitter.on('connected', onConnected);
myEmitter.on('connected', onConnected);

myEmitter.on('connected', () => {
  console.log('DB connected 2');
  myEmitter.off('connected', onConnected);
});

myEmitter.emit('connected');
myEmitter.emit('connected');
myEmitter.emit('connected');

myEmitter.on('msg', function (msg) {
  console.log(`Message ${msg}`);
});

myEmitter.emit('msg', 'Hello');
myEmitter.emit('connected');
myEmitter.on('error', (err) => {
  console.error(err);
});
myEmitter.emit('error', new Error('Something went wrong'));
