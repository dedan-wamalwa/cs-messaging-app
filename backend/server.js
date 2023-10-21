const express = require("express");
const dotenv = require("dotenv");
const messages = require("./data/messages");
const users = require("./data/users");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("API is running succesfully");
});

app.get("/api/messages", (req, resp) => {
    resp.send(messages);
});
app.get("/api/users", (req, resp) => {
    resp.send(users);
});
app.get("/api/users/:id", (req, resp) => {
    const single = users.find((c) => c._id === req.params.id);
    resp.send(single);
});
app.get("/api/messages/:id", (req, resp) => {
    const single = messages.find((c) => c._id === req.params.id);
    resp.send(single);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
