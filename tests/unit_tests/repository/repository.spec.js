const chai = require('chai');
const expect = chai.expect;
const assert = require('chai').assert;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const Repository = require('../../../src/repository/repository').Repository;
const customersMocked = require('../../fixtures/customers.json');
const mockedDb = require('../mongo_mocked');

describe('Test customers repository', () => {
  let repository = null;
  beforeEach(() => {
    // to make sure that repository alway fresh
    repository = new Repository(mockedDb);
  })
  it('Should return all customers', () => {
    return expect(repository.getAllCustomers()).to.eventually.deep.equal(customersMocked);
  });
})