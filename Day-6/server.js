let express = require('express');
let ConnectToDB = require('./src/db/db');

ConnectToDB(); 

let app = express();

app.use(express.json());

app.get('/', (req,res) =>{
    res.send("Hello World");
})

app.post('/notes', (req,res) =>{
    
    let {title, content} = req.body;
    console.log(req.body);
    
})

app.listen(3000,() => {
    console.log("Server is running on port 3000");
    
})