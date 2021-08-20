
const STATUS = Symbol('status');

const CIRCUIT_STATUS = {
  OPEN: 0,
  HALFOPEN: 1,
  CLOSED: 2
}

class SimpleCircuitBreaker {

  constructor() {
    this[STATUS] = CIRCUIT_STATUS.OPEN
  }

  getCurrentStatus() {
    return this[STATUS]
  }
}

module.exports = exports = SimpleCircuitBreaker;