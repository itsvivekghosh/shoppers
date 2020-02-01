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
    res.redirect(`/customer/${newCustomer.id}`);
  } catch {
    res.render("customer/new_customer", {
      customer: customer,
      errorMessage: "Error Creating User"
    });
  }
});

routes.put("/:id", async (req, res) => {
  let customer;
  try {
    customer = await Customer.findById(req.params.id);
    customer.name = req.body.name;
    customer.address = req.body.address;
    customer.phoneNumber = req.body.phoneNumber;
    customer.description = req.body.description;

    await customer.save();
    res.redirect(`/customer/${customer.id}`);
  } catch {
    if (customer == null) {
      res.redirect("customer/");
    } else {
      res.render("customer/update_customer", {
        customer: customer,
        errorMessage: "Error Updating Customer"
      });
    }
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.render("customer/show_customer", {
      customer: customer
    });
  } catch {
    res.redirect("/");
  }
});

routes.get("/:id/edit", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.render("customer/update_customer.ejs", {
      customer: customer
    });
  } catch {
    res.redirect("/");
  }
});

routes.delete("/:id", async (req, res) => {
  let customer;

  try {
    customer = await Customer.findById(req.params.id);
    await customer.remove();

    res.redirect("/customer");
  } catch {
    res.redirect("/");
  }
});
module.exports = routes;
