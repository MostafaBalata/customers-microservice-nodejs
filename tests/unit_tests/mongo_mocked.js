const customersMocked = require('../fixtures/customers.json');

const singleCustomerMocked = (id) => customersMocked.find((obj) => obj.customerID == id);

const mockDbCollection = {
  find: () => {
    return {
      toArray: (cb) => cb(null, customersMocked)
    };
  },
  findOne: (obj, projection, cb) => cb(undefined, singleCustomerMocked(obj.customerID)),
  ensureIndex: (obj, options) => true
};
const mockedDb = {
  collection: (name) => mockDbCollection
}

module.exports = { mockedDb, singleCustomerMocked };