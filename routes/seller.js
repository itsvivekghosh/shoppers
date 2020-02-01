const Seller = require("../models/seller");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.sellerName != null && req.query.sellerName !== "") {
    searchOptions.sellerName = new RegExp(req.query.sellerName, "i");
  }

  try {
    const seller = await Seller.find(searchOptions);
    res.render("seller/seller_index", {
      searchOptions: req.query,
      sellers: seller
    });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", function(req, res) {
  res.render("seller/new_seller.ejs", {
    seller: new Seller()
  });
});

router.post("/", async (req, res) => {
  const seller = new Seller({
    sellerName: req.body.name,
    addressOfSeller: req.body.address,
    categoryOfSeller: req.body.category,
    phoneNumber: req.body.pNumber,
    description: req.body.description
  });

  try {
    const newSeller = await seller.save();
    res.redirect(`seller/${newSeller.id}`);
  } catch {
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    res.render("seller/show_seller", {
      seller: seller
    });
  } catch {
    res.redirect("/");
  }
});

router.delete("/:id", async (req, res) => {
  let seller;

  try {
    seller = await Seller.findById(req.params.id);
    await seller.remove();
    res.redirect("/seller");
  } catch {
    res.redirect("/");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    res.render("seller/update_seller.ejs", {
      seller: seller
    });
  } catch {
    res.redirect("/");
  }
});
module.exports = router;
