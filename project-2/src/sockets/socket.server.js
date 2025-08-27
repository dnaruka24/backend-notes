const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const aiServices = require("../services/ai.service")

function socketServer(httpServer) {
    const io = new Server(httpServer, {})

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
        if (!cookies.token) {
            return next(new Error("Authentication error: No token provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
            const user = await userModel.findById(decoded.id);
            socket.user = user;
            next();
        } catch (error) {
            return next(new Error("Authentication error: Invalid token"));
        }
    })

    io.on("connection", (socket) => {
        socket.on("ai-message",async (messagePayload) => {
            console.log("Received ai-message:", messagePayload);

            const response = await aiServices.generateResponse(messagePayload.content)
            socket.emit("ai-response", {
                content: response,
                chat: messagePayload.chat
            })
        })
    })
}

module.exports = socketServer;