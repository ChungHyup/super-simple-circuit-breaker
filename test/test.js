var assert = require("assert")
var expect = require("chai").expect
var SimpleCircuitBreaker = require('../index')

describe('Circuit', function() {
  describe('Create', function() {
    const circuit = new SimpleCircuitBreaker();
    it('Create Circuit Breaker instance', function() {
      expect(circuit).to.be.a('object')
    });

    it('Default Status Shoud be OPEN', function() {
      expect(circuit.getCurrentStatus()).to.equal(2)
    });

    it('Can Call Success Function',function() {
      circuit.run(() => {
        console.log("success function")
      })
      expect(circuit.getCurrentStatus()).to.equal(2)
    });

    it('Can Call Fail Function and status shloud be changed',function() {
      circuit.run(() => {
        throw new Error("Fail!!")
      })
      expect(circuit.getCurrentStatus()).to.equal(0)
    });

  });
});