const express = require('express');
const app = express();
const product = require('./routes/product');
const category = require('./routes/category');
<<<<<<< HEAD
const order = require('./routes/order');
=======
const user = require('./routes/user');
>>>>>>> cc34167ec54cc7e0deefe657d39592a89e87100b

app.use(express.json());

// Use the product routes middleware
app.use('/products', product);
app.use('/category', category);
<<<<<<< HEAD
app.use('/order', order);
=======
app.use('/user', user);
>>>>>>> cc34167ec54cc7e0deefe657d39592a89e87100b

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});