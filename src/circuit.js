
const STATUS = Symbol('status');
const OPTIONS = Symbol('options');
const FAILED_COUNT = Symbol('failed_count');

const CIRCUIT_STATUS = {
  OPEN: 0,
  HALFOPEN: 1,
  CLOSED: 2
}

/**
 * 
 */
class SimpleCircuitBreaker {

  /**
   * 
   * @param {Object} options 
   * @param {number} options.retry number of retry count
   */
  constructor(options) {
    this[STATUS] = CIRCUIT_STATUS.CLOSED
    this[OPTIONS] = options
    this[FAILED_COUNT] = 0
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
        this.handleFail();
        reject(err);
      }
    })
  }

  handleFail = () => {
    this[FAILED_COUNT]++;
    if (this[FAILED_COUNT] >= 3) {
      this[STATUS] = CIRCUIT_STATUS.OPEN
    }
  }
}

module.exports = exports = SimpleCircuitBreaker;