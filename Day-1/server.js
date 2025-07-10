let http = require('http') 

let server = http.createServer((req, res)=>{
    res.end('Hello from the server!') 
})  
// createServer ek function hai jo http server banata hai
//res.end() method ka use karke hum response bhejte hain

server.listen(3000, ()=>{
    console.log('Server is running on port 3000');
}) 
// server.listen() method ka use karke hum server ko kisi port par run karte hain



//  --------------->

// humne yahan http ko node ki madad se install nhi kiya jaise index.js me cat-me ko kiya tha, bcz http ek module h or cat-me ek package h

// modules aur packages me kya difference hai?

// modules node.js ke sath hi aate hain, or packages ko hum npm se install karte hain