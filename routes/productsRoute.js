const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/getallproducts', (req, res) => {
    //empty object '{}' indicates that there is no condition in find method
    Product.find({}, (err, docs) => {
        //find(error, result(we write it as documents))
        if (!err) {
            return res.send(docs);
        } else {
            return res.status(400).json({
                message: 'Something went wrong'
            })
        }
    })
})

router.post('/getproductbyid', (req, res) => {
    Product.find({ _id: req.body.productid }, (err, docs) => {
        if (!err) {
            return res.send(docs[0]);
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        }
    })
})

//submit reviews
router.post('/addreview', async (req, res) => {
    const { review, productid, currentUser } = req.body;
    const product = await Product.findById({ _id: productid })

    const reviewmodel = {
        name: currentUser.name,
        userid: currentUser._id,
        rating: review.rating,
        comment: review.comment
    }

    product.reviews.push(reviewmodel);

    //overall rating
    var rating = product.reviews.reduce((acc, x) => acc + x.rating, 0) / product.reviews.length;

    product.rating = rating;

    product.save(err => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.send('Review Submitted Successfully');
        }
    })
})

//delete product by admin
router.post('/deleteproduct', (req, res) => {
    Product.findByIdAndDelete(req.body.productid, (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.send('Product Delete Successfully');
        }
    })
})

//add new product by admin
router.post('/addproduct', (req, res) => {
    const { product } = req.body;

    const productModel = new Product({
        name: product.name,
        price: product.price,
        description: product.description,
        countInStock: product.countInStock,
        image: product.image,
        Category: product.category
    })

    productModel.save(err => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.send('Product Added Successfully');
        }
    })
})

//update product by admin
router.post('/updateproduct', (req, res) => {
    Product.findByIdAndUpdate(req.body.productid, {
        name: req.body.updatedproduct.name,
        price: req.body.updatedproduct.price,
        description: req.body.updatedproduct.description,
        countInStock: req.body.updatedproduct.countInStock,
        image: req.body.updatedproduct.image,
        Category: req.body.updatedproduct.category
    }, (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.send('Product Updated Successfully');
        }
    })
})

module.exports = router;