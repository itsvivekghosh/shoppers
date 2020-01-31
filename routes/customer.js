const express = require("express");
const routes = express.Router();
const Customer = require("../models/customer");

//Rendering Home page with all customer
routes.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const customers = await Customer.find(searchOptions);
    res.render("customer/customer_index.ejs", {
      searchOptions: req.query,
      customers: customers
    });
  } catch {
    res.redirect("/");
  }
});

//Create new Customer
routes.get("/new", function(req, res) {
  res.render("customer/new_customer.ejs", {
    customer: new Customer()
  });
});

//Create new Customer
routes.post("/", async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    description: req.body.description
  });
  try {
    const newCustomer = await customer.save();
    res.redirect("/customer");
  } catch {
    res.render("customer/new_customer", {
      customer: customer,
      errorMessage: "Error Creating User"
    });
  }
});

module.exports = routes;
