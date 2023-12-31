const express = require("express");
const dotenv = require("dotenv");
const messages = require("./data/messages");
const dbConnect = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const messageRoutes = require("./routes/MessagesRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
dbConnect();
const app = express();
app.use(express.json());
const origins = process.env.CORS_ORIGINS.split(",");
app.use(
    cors({
        origin: origins,
    })
);

app.get("/", (req, resp) => {
    resp.send("API is running succesfully");
});

app.get("/api/message", (req, resp) => {
    resp.send(messages);
});
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
const DEFAULT_COMPANY_ID = process.env.DEFAULT_COMPANY_ID;
const DEFAULT_PING_TIMEOUT = process.env.DEFAULT_PING_TIMEOUT;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));
const io = require("socket.io")(server, {
    cors: {
        origin: origins,
    },
    pingTimeout: parseInt(DEFAULT_PING_TIMEOUT),
});

io.on("connection", (socket) => {
    console.log("Conneceted to socketio");
    socket.on("setup", (userData) => {
        if (!userData) {
            return console.log("Error: userData is null!");
        }
        socket.join(userData._id);
        console.log("set up user: " + userData._id);
        socket.emit(`${userData.name} connected`);
    });
    socket.on("agentLogIn", (agentId) => {
        if (!agentId) {
            return console.log("Error: agent id null!");
        }
        socket.join(DEFAULT_COMPANY_ID);
        console.log(agentId + " joined agent room : {" + DEFAULT_COMPANY_ID + "}");
        socket.emit(`${agentId} connected`);
    });
    socket.on("joinChat", (customerId) => {
        if (!customerId) {
            return console.log("Error: customer id null!");
        }
        socket.join(customerId);
        console.log("User joined chat: " + customerId);
    });

    socket.on("newMessage", (newMessageReceived) => {
        if (!newMessageReceived) {
            return console.log("message null!");
        }
        const customer = newMessageReceived.customer;
        if (!customer) return console.log("message not tied to customer");
        socket.in(customer).emit("messageReceived", newMessageReceived);
        console.log(newMessageReceived)
        if (newMessageReceived.isCustomerMessage && !newMessageReceived.isRead) {
            socket.in(DEFAULT_COMPANY_ID).emit("customerMessageReceived", newMessageReceived);
            console.log("msg sent to admin")
        }
    });
    socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(userData._id);
    });
});
