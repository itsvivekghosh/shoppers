const express = require("express")
const Product = require("../models/products")
const Seller = require("../models/seller")

const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

const Routes = express.Router()

Routes.get("/", async (req, res) => {
    let searchOptions = {}

    if (req.query.nameOfProduct != null && req.query.nameOfProduct !== '') {
        searchOptions.nameOfProduct = new RegExp(req.query.nameOfProduct, "i");
    }
    try {
        const products = await Product.find(searchOptions)

        res.render("product/product_index",
            {
                searchOptions: req.query,
                products: products
            }
        )
    } catch{
        res.redirect("/")
    }
})

Routes.get("/new", async (req, res) => {
    try {
        const sellers = await Seller.find({})
        res.render("product/new_product", {
            product: new Product(), sellers: sellers
        })
    } catch{
        res.redirect("/new")
    }
})

Routes.post("/", async (req, res) => {
    const product = new Product({
        nameOfProduct: req.body.nameOfProduct,
        priceOfProduct: req.body.priceOfProduct,
        description: req.body.description,
        sellerOfProduct: req.body.sellerOfProduct
    })
    saveCover(product, req.body.product_image)

    try {
        const newProduct = await product.save();
        console.log(newProduct)
        res.redirect(`product/${newProduct.id}`)
    }
    catch (err) {
        console.log(err)
        res.redirect("/")
    }
})

Routes.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('product/show_product', {
            product: product
        })
    } catch{
        res.redirect("/product")
    }
})


Routes.get("/:id/edit", async (req, res) => {
    try {
        const sellers = await Seller.find({})
        const product = await Product.findById(req.params.id)
        res.render("product/edit_product", {
            product: product,
            sellers: sellers
        })
    } catch (err) {
        console.log(err)
        res.redirect("/product")
    }
})

Routes.put("/:id", async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.id)
        product.nameOfProduct = req.body.nameOfProduct;
        product.description = req.body.description;
        product.sellerOfProduct = req.body.sellerOfProduct;
        product.priceOfProduct = req.body.priceOfProduct

        await product.save()

        res.redirect(`/product/${product.id}`)
    } catch (err) {
        if (product == null) {
            res.redirect("/");
        }
        else {
            res.render("product/edit_product.ejs", {
                errorMessage: "Error Updating The Seller",
                product: product
            });
        }
        console.log(err)
    }
})

Routes.delete("/:id", async (req, res) => {
    let product;
    try {
        product = await Product.findById(req.params.id)
        console.log(product)
        await product.remove()
        res.redirect("/product")
    } catch (err) {
        res.redirect("/")
    }
})


function saveCover(product, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        product.coverImage = new Buffer.from(cover.data, 'base64')
        product.coverImageType = cover.type
    }
}

module.exports = Routes