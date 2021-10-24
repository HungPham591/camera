const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/QL_CAMERA", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect failure!");
    }
}

// mongoose.set('debug', true);

mongoose.connection.on('error', () => {
    console.log('mongo error');
})
mongoose.connection.on('disconnected', () => {
    console.log('mongo disconnected');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})

module.exports = { connect };