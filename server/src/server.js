const http = require('http')
const mongoose = require('mongoose')
const {loadAllPlanets} = require('./models/planets.model')
const {mongoConnect} = require('./services/mongo')
const {loadLaunchesData} = require('./models/launches.model')
const app = require('./app')


const PORT = process.env.PORT || 8000;

const server = http.createServer(app);



async function startServer(){
    await mongoConnect();
    await loadAllPlanets();
    await loadLaunchesData();
    server.listen(PORT,()=>{
        console.log(`Listening on port : ${PORT}`)
    });
}
startServer();

