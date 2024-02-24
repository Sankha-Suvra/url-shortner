const mongoose = require('mongoose')
mongoose.set("strictQuery", true);


const connectDB = async (url)=>{

    mongoose.connect(url);

    mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

    mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
  });

    mongoose.connection.on("error", err => {
    console.log("Error while connecting to database:", err);
    process.exit(1);
  });
}



module.exports = {
    connectDB,
}