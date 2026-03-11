const mongoose = require("mongoose")
async function connectdb(path) {
    return await mongoose.connect(path);
}
module.exports = {
connectdb,
}
//connectiong the database once in a server