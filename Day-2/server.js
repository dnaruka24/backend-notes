let express = require('express')

let app = express()

app.get('/home', (req, res)=>{
    res.send('Welcome to the Home Page')
}) 

app.get('/about', (req, res)=>{
    res.send('Welcome to the About Page')
}) 

// app.get() method ka use karke hum GET request handle karte hain, jisme pehla argument route hota hai aur dusra argument callback function hota hai jo request aur response ko handle karta hai

//http module me .end() ka use hota hai, express.js me .send() ka use hota hai (.end bhi use kar sakte hain but .send is more common for express responses)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
    }
)


//express.js ka use kiya hai instead of http module kyuki express.js mein bahut saari functionalities built-in hoti hain jaise routing, middleware, etc. jo development ko asaan banati hain.

//