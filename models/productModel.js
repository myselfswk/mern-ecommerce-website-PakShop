const mongoose = require('mongoose');

//reviews is in array so we have to create seperate schema for that
const reviewSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        require: true
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        require: true
    }
}, {
    timeStamps: true
})

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    Category: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    countInStock: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true,
        default: 0
    },
    //here I change review with reviews
    reviews: [reviewSchema]
}, {
    timeStamps: true
})

//'products' is same as you create it in mongodb
const Product = mongoose.model('products', productSchema);
module.exports = Product;