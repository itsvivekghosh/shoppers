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
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
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

sellerSchema.virtual('coverImagePath').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})


module.exports = mongoose.model("Seller", sellerSchema);
