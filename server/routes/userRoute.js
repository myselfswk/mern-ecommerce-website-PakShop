const router = require('express').Router();
const User = require('../models/userModel');

// Register User route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).send("Please Fill All the Fields...!");
        }

        // if there is no error we check that the user is exist or not
        let user = await User.findOne({ email: email });
        if (user) return res.status(409).send("User Already Exist");

        const newuser = await User.create({
            name: name,
            email: email,
            password: password
        });
        if (newuser) {
            return res.status(201).send("User Registered Successfully");
        } else {
            return res.status(400).send("Something Went Wrong");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//User Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).send("User with this Email Doesn't Exist...!");

        if (user.password !== password) return res.status(404).send("Invalid Password...!");

        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
})

//Update User route
router.post('/update', async (req, res) => {
    try {
        const { userid, updateduser } = req.body;
        const updatedData = {
            name: updateduser.name,
            email: updateduser.email,
            password: updateduser.password
        }
        const options = { new: true };

        const updatedUser = await User.findByIdAndUpdate(userid, updatedData, options);
        if (updatedUser) {
            return res.status(200).send('User Updated Successfully');
        } else {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Get all users route (for admin Panel)
router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find();
        if (users) {
            return res.status(200).send(users);
        } else {
            return res.status(400).send("No Users");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Delete user by admin route
router.post('/deleteuser', async (req, res) => {
    try {
        const delUser = await User.findByIdAndRemove(req.body.userid);
        if (!delUser) {
            return res.status(400).json({
                message: 'Something Went Wrong'
            });
        } else {
            return res.status(200).send("User Deleted Successfully!");
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;