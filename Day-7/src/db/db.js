const mongoose = require('mongoose');

function ConnectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        
    })
}

module.exports = ConnectToDB;