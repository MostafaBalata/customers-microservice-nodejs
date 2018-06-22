"use strict";

export class Repository {

  constructor(db) {
    this.db = db;
    this.collection = db.collection("customers");
    this.collection.ensureIndex({ "customerID": 1 }, { unique: true })
  }

  getAllCustomers() {
      // Find some documents
      return new Promise((resolve, reject) => {
        const callback = (err, docs) => {
          if (err) {
            reject(new Error(`An error occurred fetching a customers, err: ${err}`));
          }
          resolve(docs);
        };

        this.collection.find({}).toArray(callback);
      });
    } // end function

  getCustomerById(id) {
      return new Promise((resolve, reject) => {
        const callback = (err, doc) => {
          if (err) {
            reject(new Error(Error(`An error occurred fetching a customer with id: ${id}, err: ${err}`)));
          }
          resolve(doc);
        };
        this.collection.findOne({ "customerID": parseInt(id) }, {}, callback);
      });

    } // end function

  addCustomer(data) {
    return new Promise((resolve, reject) => {
      const callback = (err, doc) => {
        if (err) {
          reject(new Error(Error(err)));
        }
        resolve(doc);
      };
      this.collection.insertOne(data, callback);
    });
  }

  updateCustomer(id, data) {
    return new Promise((resolve, reject) => {
      const callback = (err, doc) => {
        if (err) {
          reject(new Error(Error(err)));
        }
        resolve(doc);
      };
      const query = { "$set": data };
      this.collection.updateOne({ "customerID": parseInt(id) }, query, callback);
    });
  }

  close() {
    this.db.close();
  }
}