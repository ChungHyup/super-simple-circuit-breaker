
const STATUS = Symbol('status');

const CIRCUIT_STATUS = {
  OPEN: 0,
  HALFOPEN: 1,
  CLOSED: 2
}

class SimpleCircuitBreaker {

  constructor() {
    this[STATUS] = CIRCUIT_STATUS.CLOSED
  }

  getCurrentStatus() {
    return this[STATUS]
  }

  run = async (func) => {
    return new Promise(async (resolve, reject) => {
      const isAsync = func.constructor.name === "AsyncFunction";
      if(!isAsync) {
        return reject(new Error('Function must be async function'))
      }
      try {
        const result = await func();
        resolve(result);
      } catch (err) {
        this[STATUS] = CIRCUIT_STATUS.OPEN
        reject(err);
      }
    })
    
  }

}

module.exports = exports = SimpleCircuitBreaker;