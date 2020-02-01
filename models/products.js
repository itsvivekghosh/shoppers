const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nameOfProduct: {
    type: String,
    required: true
  },
  dateCreated: {
    default: Date.now()
  },
  price: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Seller"
  }
});
