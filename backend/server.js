const express = require("express");
const dotenv = require("dotenv");
const messages = require("./data/messages");
const dbConnect = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
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

app.get("/api/messages", (req, resp) => {
    resp.send(messages);
});
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
