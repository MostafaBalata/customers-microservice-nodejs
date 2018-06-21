const customersMocked = require('../fixtures/customers.json');

const mockDbCollection = {
  find: function() {
    return {
      toArray: (cb) => cb(null, customersMocked)
    };
  }
};
const mockedDb = {
  collection: (name) => mockDbCollection
}

module.exports = Object.assign({}, mockedDb);