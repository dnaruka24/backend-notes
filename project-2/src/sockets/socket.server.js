const { Server } = require("socket.io");

function socketServer(httpServer){
    const io = new Server(httpServer, {})

    io.on("connection", (socket)=>{
        console.log("New socket connected", socket.id)})
}

module.exports = socketServer;