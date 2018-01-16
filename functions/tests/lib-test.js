// deps
require('mocha');
const chai = require('chai');
const expect = chai.expect;

// lib
const lib = require('../lib');

// mocks
const jsonMock = require('./mocks/json-mock');

describe('cleanObjects', () => {
  let cleanJSON;
  before(() => {
    // do something
    cleanJSON = lib.cleanObjects(jsonMock);
  });
  after(() => {
    // clean something
    cleanJSON = null;
  });
  describe('should have required fields', () => {
    it('title', () => expect(cleanJSON[0].title).to.exist);
    it('link', () => expect(cleanJSON[0].link).to.exist);
  });
});

// Live test, change to network mock later
describe('searchAggregator', function() {
  this.timeout(10000);
  let content;
  before(done => {
    lib.getFeed('progressive%20web%20apps').then(data => {
      content = data;
      done();
    });
  });
  after(() => {
    content = null;
  });

  describe('it should return content', () => {
    it('should be an object', () => expect(content).to.be.an('Array'));
  });
  describe('should have required fields:', () => {
    it('title', () => expect(content[0].title).to.exist);
    it('link', () => expect(content[0].link).to.exist);
  });
});
