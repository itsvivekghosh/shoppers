const mongoose = require("mongoose");
const today = new Date();
const productSchema = new mongoose.Schema({
  nameOfProduct: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  priceOfProduct: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ratingOfProduct: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: Buffer,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  sellerOfProduct: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Seller'
  }
});

productSchema.virtual('coverImagePath').get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})


module.exports = mongoose.model("Products", productSchema)