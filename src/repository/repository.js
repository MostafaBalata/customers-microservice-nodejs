"use strict";

/**
 * Repository, is a class that have database management functions. 
 */
export class Repository {

  constructor(db) {
    this.db = db;
    this.collection = db.collection("customers");
    this.collection.ensureIndex({ "customerID": 1 }, { unique: true });
  }

  async getAllCustomers() {
    return this.collection.find({}).toArray();
  }

  async getCustomerById(id) {
    return this.collection.findOne({ "customerID": parseInt(id) }, {});
  }

  async getLastCustomerAdded() {
    return await this.collection.find({}).sort({ customerID: -1 }).limit(1).toArray();
  }

  async addCustomer(data) {
    const customers = await this.getLastCustomerAdded();
    data["customerID"] = customers.length >= 1 ? customers[0]["customerID"] + 1 : 1;
    return this.collection.insertOne(data);
  }

  async deleteCustomer(id) {
    return this.collection.deleteOne({ customerID: parseInt(id) });
  }

  async updateCustomer(id, data) {
    delete data["_id"];
    const query = { "$set": data };
    return this.collection.updateOne({ "customerID": parseInt(id) }, query);
  }

  close() {
    this.db.close();
  }
}