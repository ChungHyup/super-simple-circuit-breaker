var assert = require("assert")
var expect = require("chai").expect
var SimpleCircuitBreaker = require('../index')

describe('Circuit', function() {
  describe('Create', function() {
    it('Create Circuit Breaker instance', function() {
      const circuit = new SimpleCircuitBreaker();
      expect(circuit).to.be.a('object')
    });
  });
});