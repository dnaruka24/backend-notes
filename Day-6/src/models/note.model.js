let mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title : String,
    content : String
});
// Schema data ka structure define karta hai, ki data konse datatype ka hoga, jaise title aur content dono string type ke honge ya koi data- number, boolean, date etc. type ka bhi ho skta hai

let noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;

// Schema structure ke baare me batata hai aur model us structure ko use karke CRUD operations perform karta hai
