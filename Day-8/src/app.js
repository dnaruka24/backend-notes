const express = require('express');
const indexRoutes = require('./routes/index.routes')

const app = express();
app.use(express.json());

// we have used a middleware below
// middleware ke kuch use hote hain jaise - req ke data ko modify karna, ya response ke data ko modify karna, ya request aur response ke beech kuch aur kaam karna etc.

app.use((req,res,next) => {
    console.log('This middleware is between app and router');
    next();
}) 
// it is important to call next() bcz agar next() nahi call karte toh request yahin atak jaegi aur response nahi milega

app.use('/', indexRoutes);

module.exports = app;






//Middleware tab use karte hain jab hume request ya response ko handle, modify, ya control karna ho web app ke flow mein.

// Common Situations to Use Middleware:

// Authentication – Check karo user login hai ya nahi

// Authorization – Sirf admin ya specific user ko access dena

// Logging – Har request ka log banana

// Validation – User input sahi hai ya nahi check karna

// Error Handling – Agar koi error aaye toh usse handle karna

// CORS – Cross-Origin requests allow ya block karna

// Body Parsing – JSON ya form data ko parse karna