import EventEmitter from 'eventemitter3';
const eventEmitter = new EventEmitter();

const eventMqtt ={
    on: (event, fn) => eventEmitter.on(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
    off: (event, fn) => eventEmitter.off(event, fn)
}
Object.freeze(eventMqtt);
export default eventMqtt