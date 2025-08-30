const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const aiServices = require("../services/ai.service")
const messageModel = require("../model/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

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
        socket.on("ai-message", async (messagePayload) => {

            /*
            messagePayload = {
                chat: chatId,
                content: message text content
                }
            */

           const message = await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: messagePayload.content,
                role: "user"
            })

            const vectors = await aiServices.generateVector(messagePayload.content);
            
            const memory = await queryMemory({
                queryVector: vectors,
                limit: 3,
                metadata: {}
            })

            await createMemory({
                vectors,
                messageId: message._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: messagePayload.content
                }
            })

            console.log("Memory: ", memory);
            

            const chatHistory = (await messageModel.find({ chat: messagePayload.chat }).sort({ createdAt: -1 }).limit(11).lean()).reverse();            

            const response = await aiServices.generateResponse(chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            }))

            const responseMessage = await messageModel.create({
                user: socket.user._id,
                chat: messagePayload.chat,
                content: response,
                role: "model"
            })

            const responseVectors = await aiServices.generateVector(response);

            await createMemory({
                vectors: responseVectors,
                messageId: responseMessage._id,
                metadata: {
                    chat: messagePayload.chat,
                    user: socket.user._id,
                    text: response  
                }
            })

            socket.emit("ai-response", {
                content: response,
                chat: messagePayload.chat
            })
        })
    })
}

module.exports = socketServer;