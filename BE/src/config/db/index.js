const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/QL_CAMERA", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect failure!");
    }
}

mongoose.set('debug', true);

module.exports = { connect };