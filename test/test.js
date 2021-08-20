var assert = require("assert")
var expect = require("chai").expect
var should = require("chai").should

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

    it('Can not call Not an async Function',async function() {
      try {
        const response = await circuit.run(() => {})
        expect(response).to.be.null
      } catch(err) {
        expect(err).to.not.be.null
        expect(circuit.getCurrentStatus()).to.equal(2)
      }
    });

    it('Can Call Success Async Function',function() {
      circuit.run(async () => {})
      expect(circuit.getCurrentStatus()).to.equal(2)
    });

    it('Can Call Fail Function and status shloud be changed',async function() {
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
  });
});