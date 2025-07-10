// server database se kaise, kis tarah se connect hoga wo tum db.js file me likhoge
// par server database se connect server.js file me hoga    <--- IMPORTANT

let mongoose = require('mongoose');


function ConnectToDB() {
    mongoose.connect("mongodb+srv://deepaknaruka:EOpTa8QJNF0DKi07@cluster0.krgd45t.mongodb.net/cohort") 

    .then(() =>{
        console.log("Connected to MongoDB successfully");
    }) 
    
    // we used .then() kyuki humara database atlas pe hai(jo ki cloud storage hai) aur humara server local system pe hai to humara server aur database dono ko connect hone kitna time lagega ye pata nahi hota, isliye humne then() use kiya hai, jisse ve jab bhi connect ho jaye to then() ka code chalega
}


module.exports = ConnectToDB;