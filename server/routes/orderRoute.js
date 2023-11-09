const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Place Order route
router.post('/placeorder', async (req, res) => {
    try {
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
        }, { idempotencyKey: uuidv4() });
        //unique id for every transection

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

            const orders = order.save()
            if (!orders) {
                return res.status(400).json({
                    message: 'Something Went Wrong'
                })
            } else {
                return res.status(201).send('Ordered Placed Successfully');
            }

        } else {
            return res.status(400).json({
                message: 'Payment Failed'
            })
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get Order By User ID route
router.post('/getordersbyuserid', async (req, res) => {
    try {
        const { userid } = req.body;
        const orders = await Order.find({ userid: userid });

        if (orders) {
            return res.status(200).send(orders);
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

// Get order by Order Id route
router.post('/getorderbyid', async (req, res) => {
    try {
        const { orderid } = req.body;
        const singleOrder = await Order.findOne({ _id: orderid });
        if (singleOrder) {
            return res.status(200).send(singleOrder);
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//show orders list route
router.get('/getallorders', async (req, res) => {
    try {
        const allOrders = await Order.find();
        if (!allOrders) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            return res.status(200).send(allOrders);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;