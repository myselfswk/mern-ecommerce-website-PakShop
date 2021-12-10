const mongoose = require('mongoose');

var mongoDBURL = 'mongodb+srv://myselfswk:waleed1999@cluster0.wqwkt.mongodb.net/mern-ecommerce';

//mongoose.connect accepts two parameters: mongo db url & an object that takes two properties
mongoose.connect(mongoDBURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var dbconnect = mongoose.connection

dbconnect.on('error', () => {
    console.log('Mongo DB not Connect');
})

dbconnect.on('connected', () => {
    console.log('Mongo DB Connected');
})

module.exports = mongoose;