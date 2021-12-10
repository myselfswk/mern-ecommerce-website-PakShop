const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel');

const stripe = require('stripe')("sk_test_51JeH61B1Uwej0352x7UUJNCGqbwRph8QZWt8H4m1dCR6mUv4jKkHBNtud42xc6iEloik51kk3RYezCtBvk0D0t0100jlNYlbiK");

router.post('/placeorder', async (req, res) => {
    const { token, currentUser, subtotal, cartItems } = req.body;

    //first, we create customer
    const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
    })

    //second, we create payment
    const payment = await stripe.charges.create({
        amount: subtotal * 100,
        currency: 'pkr',
        customer: customer.id,
        receipt_email: token.email
    }, {
        idempotencyKey: uuidv4()
        //unique id for every transection
    })

    //check if our payment is successfull or not
    if (payment) {
        const order = new Order({
            userid: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            orderItems: cartItems,
            shippingAddress: {
                address: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                postalCode: token.card.address_zip,
            },
            orderAmount: subtotal,
            transactionId: payment.source.id,
            isDelivered: false
        });

        order.save(err => {
            if (err) {
                return res.status(400).json({
                    message: 'Something Went Wrong'
                })
            } else {
                res.send('Ordered Placed Successfully');
            }
        })

    } else {
        return res.status(400).json({
            message: 'Payment Failed'
        })
    }
});

router.post('/getordersbyuserid', (req, res) => {
    const userid = req.body.userid;

    Order.find({ userid: userid }, (err, docs) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            res.send(docs);
        }
    })
})

//show orders list
router.post('/getorderbyid', (req, res) => {
    const orderid = req.body.orderid;

    Order.find({ _id: orderid }, (err, docs) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            res.send(docs[0]);
        }
    })
})

//show orders list
router.get('/getallorders', (req, res) => {
    Order.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            res.send(docs)
        }
    })
})

module.exports = router;