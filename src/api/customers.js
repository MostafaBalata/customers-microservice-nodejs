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
      res.status(status.OK).json(customer);
    }).catch(next);
  });
};