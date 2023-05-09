const express = require('express');
const app = express();
const product= require('./routes/product');

app.use(express.json());

// Use the product routes middleware
app.use('/products', product);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});