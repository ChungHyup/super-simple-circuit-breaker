
const STATUS = Symbol('status');
const OPTIONS = Symbol('options');
const FAILED_COUNT = Symbol('failed-count');
const HALFOPEN_TIMER = Symbol('halfopen-timer');

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
   * @param {number} opeions.halfopenTime open time in millesec
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
    const isAsync = func.constructor.name === "AsyncFunction";
    if(!isAsync) {
      return Promise.reject(new Error('Function must be async function'));
    }

    if(this[STATUS] === CIRCUIT_STATUS.OPEN) {
      return Promise.reject(new Error('CIRCUIT OPEN'));
    }

    return new Promise(async (resolve, reject) => {
      try {
        const result = await func();
        this.handleSuccess();
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
      this[STATUS] = CIRCUIT_STATUS.OPEN;
      this.startTimer();
    }
  }

  handleSuccess = () => {
    if (this[STATUS] === CIRCUIT_STATUS.CLOSED) return
    
    this.reset()
  }

  startTimer () {
    this[HALFOPEN_TIMER] = setTimeout(() => {
      this[STATUS] = CIRCUIT_STATUS.HALFOPEN
    }, this[OPTIONS].halfopenTime);
  }

  reset() {
    clearTimeout(this[HALFOPEN_TIMER]);
    this[STATUS] = CIRCUIT_STATUS.CLOSED;
    this[FAILED_COUNT] = 0;
  }

}

module.exports = exports = SimpleCircuitBreaker;