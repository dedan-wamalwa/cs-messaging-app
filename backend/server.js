const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const app = express();
dotenv.config();
app.get("/", (req, resp) => {
    resp.send("API is running succesfully");
});

app.get("/api/chat", (req, resp) => {
    resp.send(chats);
});

app.get("/api/chat/:id", (req, resp) => {
    const single = chats.find((c) => c._id === req.params.id);
    resp.send(single);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
