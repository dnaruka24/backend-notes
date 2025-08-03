const express = require('express');
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(express.json());

app.use('/auth', authRoutes)

// jisse related api create karni hai wo yaha likhte hai jaise-
// app.use('product', productRoutes)  products related api
// app.use('customer', customerRoutes)  customers related api


module.exports = app;