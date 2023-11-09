const router = require('express').Router();
const Product = require('../models/productModel');

// Get All Product Route
router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find();
        if (products) {
            return res.status(200).send(products);
        } else {
            return res.status(400).json({
                message: 'Something went wrong'
            })
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Get Product By ID Route (By Using body, not params)
router.post('/getproductbyid', async (req, res) => {
    try {
        const product = await Product.findById(req.body.productid);
        if (product) {
            return res.status(200).send(product);
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//submit reviews Route (By Logged In User)
router.post('/addreview', async (req, res) => {
    try {
        const { review, productid, currentUser } = req.body;
        const product = await Product.findById(productid);

        // add reviews by logged In user
        const reviewmodel = {
            name: currentUser.name,
            userid: currentUser._id,
            rating: review.rating,
            comment: review.comment
        }

        product.reviews.push(reviewmodel);

        //overall rating (previous rating with new rating)
        var rating = product.reviews.reduce((acc, x) => acc + x.rating, 0) / product.reviews.length;

        product.rating = rating;

        const addReview = await product.save();
        if (addReview) {
            return res.status(200).send('Review Submitted Successfully');
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//delete product by admin Route
router.post('/deleteproduct', async (req, res) => {
    try {
        const delProduct = await Product.findByIdAndDelete(req.body.productid);
        if (!delProduct) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.status(200).send('Product Delete Successfully');
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//add new product by admin
router.post('/addproduct', async (req, res) => {
    try {
        const { product } = req.body;

        const productModel = new Product({
            name: product.name,
            price: product.price,
            description: product.description,
            countInStock: product.countInStock,
            image: product.image,
            Category: product.category
        });

        const addProduct = await productModel.save();
        if (addProduct) {
            return res.status(201).send('Product Added Successfully');
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//update product by admin
router.post('/updateproduct', async (req, res) => {
    try {
        const { updatedproduct, productid } = req.body;
        const updatedData = {
            name: updatedproduct.name,
            price: updatedproduct.price,
            description: updatedproduct.description,
            countInStock: updatedproduct.countInStock,
            image: updatedproduct.image,
            Category: updatedproduct.category
        }
        const options = { new: true };

        const updateProd = await Product.findByIdAndUpdate(productid, updatedData, options);
        if (updateProd) {
            return res.status(200).send('Product Updated Successfully');
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;