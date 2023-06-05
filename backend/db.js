const mongoose = require('mongoose');
// mongodb://localhost:27017 
// const mongoURI = "mongodb://localhost:27017/INoteBook";
const mongoURI = "mongodb+srv://akshaysonawane1958:Akshay_2023@cluster0.ynz16zn.mongodb.net/INoteBook"

const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,{useNewUrlParser: true, 
        useUnifiedTopology: true, 
        }, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo