let express = require("express");
let ConnectToDB = require("./src/db/db");
let noteModel = require("./src/models/note.model");

ConnectToDB();

let app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  let { title, content } = req.body;
  console.log(title, content);

  await noteModel.create({ title, content });
  res.json({
    message: "Note created successfully",
  });
});  
// Create operation perform perform kiya hai with noteModel.create() method

app.get("/notes", async (req, res) => {
  let notes = await noteModel.find();
  res.json({
    message: "Notes fetched successfully",
    notes
  });
}); 
// yahan humne noteModel.find() method use kiya hai, jo ki sabhi notes ko fetch karega(read operation perform kiya hai), aur use notes naam ke variable me store karke, response me bhej diya hai

app.delete('/notes/:id', async(req, res) => {
    let noteId = req.params.id;
    await noteModel.findOneAndDelete({
        _id: noteId
    })
    res.json({
        message: "Note deleted successfully"
    })
})
// yahan humne delete operation perform kiya hai. Delete operation ke liye hum id ko select karte hain jo ki params se aata hai aur .findOneAndDelete() method use karke us id ke data ko delete kar dete hain.

// _id MongoDB ka unique identifier hota hai, ye automatically generate hota hai jab bhi hum koi naya data create karte hain. har naye data ke liye mongo ek new _id generate karta hai.

app.patch('/notes/:id', async(req, res) => {
    let noteId = req.params.id;
    let{title} = req.body;

    await noteModel.findOneAndUpdate({
        _id : noteId
    },{
        title:title
    })
    res.json({
        message: "Note updated successfully"
    })
})
// .patch() method use karke humne update operation perform kiya hai. Patch operation me hum sirf wahi data update karte hain jo hume chahiye hota hai, jaise yahan humne sirf title ko update kiya hai. Humne noteId ko params se liya aur req.body se title ko liya, fir findOneAndUpdate() method me _id se ek particular note ke data ko select kiya aur uske title ko update kar diya. 

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
