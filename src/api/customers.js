"use strict";
const status = require("http-status");

export const api = (app, options) => {
  const { repository } = options;

  app.get("/customers", (req, res, next) => {
    repository.getAllCustomers().then(customers => {
      res.status(status.OK).json(customers);
    }).catch(next);
  });

  app.get("/customers/:id", (req, res, next) => {
    repository.getCustomerById(req.params.id).then(customer => {
      const response = { code: status.NOT_FOUND, message: `not found customer with id ${req.params.id}` };
      if (customer)
        res.status(status.OK).json(customer);
      else
        res.status(status.NOT_FOUND).json(response);
    }).catch(next);
  });

  app.post("/customers/:id", (req, res, next) => {
    const data = req.body;

    repository.updateCustomer(req.params.id, data).then(customer => {
      const response = { code: status.NOT_FOUND, message: `not found customer with id ${req.params.id}` };
      if (customer.result.nModified == 1) {
        res.status(status.OK).json(customer);
      } else {
        res.status(status.NOT_FOUND).json(response);
      }
    }).catch(next);
  });

  app.put("/customers", (req, res, next) => {
    const data = req.body;
    const response = { code: status.BAD_REQUEST, message: `Duplicated user` };

    repository.addCustomer(data).then(customer => {
      if (customer.result.n == 1) {
        res.status(status.OK).json(customer);
      } else {
        res.status(status.BAD_REQUEST).json(response);
      }
    }).catch((err) => {
      res.status(status.BAD_REQUEST).json(response);
      next()
    });
  });

};