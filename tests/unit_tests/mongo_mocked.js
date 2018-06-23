const customersMocked = require('../fixtures/customers.json');

const singleCustomerMocked = (id) => customersMocked.find((obj) => obj.customerID == id);

const mockDbCollection = {
  find: () => {
    return {
      toArray: () => customersMocked
    };
  },
  findOne: (obj, projection) => singleCustomerMocked(obj.customerID),
  ensureIndex: (obj, options) => true
};
const mockedDb = {
  collection: (name) => mockDbCollection
}

module.exports = { mockedDb, singleCustomerMocked };