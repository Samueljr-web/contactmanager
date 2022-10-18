const mongoose = require("mongoose");

const URI = process.env.MONGO_URI

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(URI)
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log("error connecting to db", error);
        process.exit(1)
    }
}

module.exports = connectDB