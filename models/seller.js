const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: true
  },
  addressOfSeller: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    default: "0"
  },
  categoryOfSeller: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Seller", sellerSchema);
