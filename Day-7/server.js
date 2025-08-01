const express = require('express');
const ConnectToDB = require('./src/db/db');
require('dotenv').config();  
// dotenv package ko require kiya jisse ki hum .env file me saved information ko access kar sake

ConnectToDB(); 

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    
})