let mongoose = require('mongoose');


function ConnectToDB() {
    mongoose.connect("mongodb+srv://deepaknaruka:EOpTa8QJNF0DKi07@cluster0.krgd45t.mongodb.net/cohort") 

    .then(() =>{
        console.log("Connected to MongoDB successfully");
    }) 
    
}


module.exports = ConnectToDB;