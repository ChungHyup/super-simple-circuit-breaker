var assert = require("assert")
var expect = require("chai").expect
var should = require("chai").should

var SimpleCircuitBreaker = require('../index')

const RETRY = 3;
const HALFOPENTIMEOUT = 1000;

function delay(interval) {
  return it('should delay', done => {
    setTimeout(() => done(), interval)

  }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Circuit', function () {
  describe('Create', function () {
    const circuit = new SimpleCircuitBreaker({
      retry: RETRY,
      halfopenTime: HALFOPENTIMEOUT
    });
    it('Create Circuit Breaker instance', function () {
      expect(circuit).to.be.a('object')
    });

    it('Default Status Shoud be OPEN', function () {
      expect(circuit.getCurrentStatus()).to.equal(2)
    });

    it('Can not call Not an async Function', async function () {
      try {
        const response = await circuit.run(() => { })
        expect(response).to.be.null
      } catch (err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(2)
      }
    });

    it('Can Call Success Async Function', async function () {
      await circuit.run(async () => { })
      expect(circuit.getCurrentStatus()).to.equal(2)
    });

    it('Can Call Fail Function and status shloud not be changed until 3 times fail', async function () {
      try {
        const response = await circuit.run(async () => {
          throw new Error("Fail!!")
        })
        expect(response).to.be.null
      } catch (err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(2)
      }
      try {
        const response = await circuit.run(async () => {
          throw new Error("Fail!!")
        })
        expect(response).to.be.null
      } catch (err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(2)
      }
      try {
        const response = await circuit.run(async () => {
          throw new Error("Fail!!")
        })
        expect(response).to.be.null
      } catch (err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(0)
      }
    });

    it('Can Not Call Success Async Function when circuit opened', async function () {
      try {
        const response = await circuit.run(async () => { })
        expect(response).to.be.null
      } catch (err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(0)
      }
    });

    delay(HALFOPENTIMEOUT)

    it('Circuit status shuld be HALFOPEN', async function () {
      expect(circuit.getCurrentStatus()).to.equal(1)
    });

    it('Can Call Success Async Function', async function () {
      await circuit.run(async () => { })
      expect(circuit.getCurrentStatus()).to.equal(2)
    });


  });
});