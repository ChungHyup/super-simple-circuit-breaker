
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

  run = (func) => {
    try {
      func();
    } catch (err) {
      this[STATUS] = CIRCUIT_STATUS.OPEN
    }
  }
  
}

module.exports = exports = SimpleCircuitBreaker;