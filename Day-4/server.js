let express = require("express");
let app = express();

app.use(express.json()); 

let notes = [];  

app.post("/notes", (req, res) => {
  console.log(req.body);   
  notes.push(req.body); 
  
  res.json({
    message : "Note added successfully"
  }); 
});

// DELETE /notes/:index(example: /notes/0) - yeh route notes ko delete karega, jahan index URL se liya jayega

app.delete("/notes/:index", (req, res) =>{
    let index = req.params.index; // URL se index lete hain
    delete notes[index]; // notes array se us index ka note delete ho jayega jo URL me diya gaya hai, sirf wo index delete hoga, pura note nahi hoga
    res.json({
        message: "Note deleted successfully"
    })
})

//PATCH /notes/:index => {title} // yeh route notes ko update karega

app.patch("/notes/:index", (req, res) => {
    let index = req.params.index;
    let {title} = req.body;
    notes[index].title = title; // yahan sirf title update hoga, content nahi
    res.json({
        message: "Note updated successfully"
    })
})

app.get("/notes", (req, res) => {
    res.json(notes); 
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});