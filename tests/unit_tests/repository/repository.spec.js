const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const Repository = require('../../../src/repository/repository').Repository;
const customersMocked = require('../../fixtures/customers.json');
const mockedDb = require('../mongo_mocked').mockedDb;
const singleCustomerMocked = require('../mongo_mocked').singleCustomerMocked;

describe('Test customers repository', () => {
  let repository = null;
  beforeEach(() => {
    // to make sure that repository alway fresh
    repository = new Repository(mockedDb);
  })
  it('Should return all customers', () => {
    return expect(repository.getAllCustomers()).to.eventually.deep.equal(customersMocked);
  });

  it('Should return one customer', () => {
    const expectedResult = singleCustomerMocked(1);
    return expect(repository.getCustomerById(1)).to.eventually.deep.equal(expectedResult);
  });

  it('Should return undefined, give none exist customer ', () => {
    return expect(repository.getCustomerById(10)).to.eventually.equal(undefined);
  });

})