// API ka kaam mainly 2 application ke beech communication karna hota hai chahe wo kisi bhi tarah se ho.
// par API ko use karne k bhi kuch tareeke hote hain.

// ways to send data from the server:
// req.body - jab hum POST, PUT, ya PATCH request karte hain, tab hum data ko req.body me bhejte hain.
// req.query - jab hum GET request karte hain, tab hum data ko URL ke query parameters me bhejte hain.
// req.params - jab hum URL parameters ka use karte hain, tab hum data ko URL ke path me bhejte hain

// (1) REST API - REST API k kuch rules ya guidelines hote hain applications ke beech communication karne ke liye.
// there are some methods in REST API like GET, POST, PATCH, DELETE etc.

// GET - GET method ka use mainly data ko get karne ke liye hota hai.
// POST - to send new data to the server. matlab data frontend se backend me bhejna hai to POST method ka use karte hain.
// PATCH - to update existing data on the server.
// DELETE - to delete data from the server.




let express = require("express");
let app = express();

app.use(express.json()); // Middleware jo ki req.body me data lekar aayega postman se

let notes = []  // GET /notes - yeh route notes ko get karega 

// ek important baat ki jitne bhi variables hote hain wo apni value ram me store karte hain to jab bhi server restart hoga to saara data khatam ho jayega or variable apni initial value pe aa jayega.(jaise yahan notes array dobara empty ho jayega server restart hone par)

//POST /notes = {title, content} data jo ki frontend (postman) se aayega 
app.post("/notes", (req, res) => {
  console.log(req.body);    // yahan data postman ke through aayega
  notes.push(req.body); // yahan data ko notes array me push karenge
  
  res.json({
    message : "Note added successfully"
  }); // ye response postman me dikhayega
});

app.get("/notes", (req, res) => {
    res.json(notes); 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

