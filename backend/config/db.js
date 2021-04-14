const mongoose = require('mongoose');

const connString = process.env.DATABASE_CONNECTION;

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log("MongoDb connection SUCCESS")
    } catch (error) {
        console.log("MongoDb connection FAIL")
        console.log(error)
        process.exit(1);

    }
}

module.exports = connectDB;