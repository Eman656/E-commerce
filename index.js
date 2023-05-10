const express = require('express');
const app = express();
const product = require('./routes/product');
const category = require('./routes/category');
const order = require('./routes/order');

app.use(express.json());

// Use the product routes middleware
app.use('/products', product);
app.use('/category', category);
app.use('/order', order);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});