const mongoose = require('mongoose')
const MONGO_URL =`mongodb+srv://Numeez:troPA2G95zn1HDgB@nasaproject.jucfmcf.mongodb.net/?retryWrites=true`

mongoose.connection.once("open",()=>{console.log("MongoDB connection ready")})
mongoose.connection.on("error",(err)=>{console.log(err)})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL)
}
async function mongoDisconnect(){
    await mongoose.disconnect()
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}