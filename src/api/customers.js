"use strict";
import status from "http-status";

/**
 * Module contains the customers endpoints
 * @param {*} app 
 * @param {*} options 
 */
export const api = (app, options) => {
  const { repository } = options;

  app.get("/customers", async(req, res, next) => {
    try {
      const customers = await repository.getAllCustomers();
      res.status(status.OK).json(customers);
    } catch (err) {
      next();
    }
  });

  app.get("/customers/:id", async(req, res, next) => {
    const response = { code: status.NOT_FOUND, message: `not found customer with id ${req.params.id}` };
    try {
      const customer = await repository.getCustomerById(req.params.id);
      if (customer) {
        res.status(status.OK).json(customer);
      } else {
        throw new Error("Customer not found");
      }
    } catch (err) {
      res.status(status.NOT_FOUND).json(response);
      next();
    }
  });

  app.post("/customers/:id", async(req, res, next) => {
    const data = req.body;
    const response = { code: status.NOT_FOUND, message: `not found customer with id ${req.params.id}` };
    try {
      const customer = await repository.updateCustomer(req.params.id, data);
      if (customer.result.nModified == 1) {
        res.status(status.OK).json(customer);
      } else {
        throw new Error("Customer is not exist");
      }
    } catch (err) {
      res.status(status.NOT_FOUND).json(response);
      next();
    }
  });

  app.delete("/customers/:id", async(req, res, next) => {
    const response = { code: status.NOT_FOUND, message: `not found customer with id ${req.params.id}` };
    try {
      const customer = await repository.deleteCustomer(req.params.id);
      if (customer.result.n == 1) {
        res.status(status.OK).json(customer);
      } else {
        throw new Error(JSON.stringify(customer.result));
      }
    } catch (err) {
      res.status(status.NOT_FOUND).json(response);
      next();
    }
  });


  app.put("/customers", async(req, res, next) => {
    const data = req.body;
    const response = { code: status.BAD_REQUEST, message: "Duplicated user" };
    try {
      const customer = await repository.addCustomer(data);
      res.status(status.OK).json(customer);
    } catch (err) {
      res.status(status.BAD_REQUEST).json(response);
      next();
    }
  });

};