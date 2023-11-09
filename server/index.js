require('dotenv').config();

const app = require('express')();
const bodyParser = require('body-parser');
require('./config/db')();

var productsRoute = require('./routes/productsRoute');
var userRoute = require('./routes/userRoute');
var orderRoute = require('./routes/orderRoute');

app.use(bodyParser.json());

app.use('/api/products/', productsRoute);
app.use('/api/users/', userRoute);
app.use('/api/orders/', orderRoute);

//first we have to create variable for port number
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('NodeJS server started'));