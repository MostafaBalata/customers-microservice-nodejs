const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const serverSettings = require('../../../src/config').serverSettings;
const customersMocked = require('../../fixtures/customers.json');

const mongo = require('mocha-mongo')('mongodb://localhost/customers_tests');
let ready = mongo.ready();
const clean = mongo.cleanCollections(['customers']);
const cleanCollection = clean((db, done) => {
  db.collection('customers').find().count(function(err, count) {
    expect(count).to.equal(0);
    done();
  });
})
const createCollection = ready((db, done) => {
  db.collection('customers').insertMany(customersMocked, done);
});
const closeDB = ready((db, done) => {
  db.close();
  done()
});

describe('GET /customers', () => {
  const api = request(serverSettings.url + ":" + serverSettings.port)

  afterEach(cleanCollection);
  beforeEach(createCollection);

  it('Should respond with all customers', (done) => {
    api.get('/customers')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200).then((response) => {
        expect(response.body.length).to.equal(5);
        done()
      }).catch((err) => {
        done(err)
      });
  });
});

describe('/customers:id', () => {
  const api = request(serverSettings.url + ":" + serverSettings.port)
  afterEach(cleanCollection);
  beforeEach(createCollection);
  after(closeDB);
  it('Should success, test exist customer with id 1', (done) => {
    api.get('/customers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Should fail, test not exist customer with id 10', (done) => {
    api.get('/customers/10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('Should success, update customer birthday', (done) => {
    api.post('/customers/1')
      .send({ "birthday": "1996-10-13" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Should success, delete customer', (done) => {
    api.delete('/customers/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Should fail, update not exist customer', (done) => {
    api.post('/customers/10')
      .send({ "birthday": "1996-10-13" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  });

  it('Should success, add new customer', (done) => {
    const customerObj = {
      "name": {
        "first": "John",
        "last": "Adam"
      },
      "birthday": "1991-02-21",
      "gender": "m",
      "lastContact": "2017-08-01T11:57:47.142Z",
      "customerLifetimeValue": 0
    };

    api.put('/customers')
      .send(customerObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});