const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

router.post('/register', (req, res) => {
    User.find({
        email: req.body.email
    }, (err, docs) => {
        if (docs.length > 0) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            const newuser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            newuser.save(err => {
                if (!err) {
                    res.send("User Registered Successfully");
                } else {
                    res.send("Something Went Wrong");
                }
            })
        }
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        }
    })
});

//User Login
router.post('/login', (req, res) => {
    User.find({
        email: req.body.email,
        password: req.body.password
    }, (err, docs) => {
        if (docs.length > 0) {
            const user = {
                _id: docs[0]._id,
                name: docs[0].name,
                email: docs[0].email
            }
            res.send(user);
        } else {
            return res.status(400).json({
                message: 'Invalid Credentials'
            })
        }
    })
})

//Update User
router.post('/update', (req, res) => {
    const { userid, updateduser } = req.body;
    User.findByIdAndUpdate(userid, {
        name: updateduser.name,
        email: updateduser.email,
        password: updateduser.password
    }, (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            })
        } else {
            res.send("User Details Updated Successfully");
        }
    })
});

//Get all users for admin Panel
router.get('/getallusers', (req, res) => {
    //no condition because we need to send all the data
    User.find({}, (err, docs) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            res.send(docs)
        }
    })
});

//Delete user by admin
router.post('/deleteuser', (req, res) => {
    User.findByIdAndRemove(req.body.userid, (err) => {
        if (err) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            res.send("User Deleted Successfully!")
        }
    })
})

module.exports = router;