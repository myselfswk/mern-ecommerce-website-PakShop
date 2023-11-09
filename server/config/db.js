const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('strictQuery', false);

    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database Successfully');

    } catch (error) {
        console.log('Could not Connected to DB...', error);
    }
}