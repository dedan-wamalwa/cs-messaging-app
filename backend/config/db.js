const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(`An error occured: ${error.message}`);
        process.exit();
    }
};

module.exports = dbConnect;
