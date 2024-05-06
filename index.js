
require('dotenv').config()

const express = require('express');

//import cors
const cors = require('cors');

const db = require('./DB/connection')

const router = require('./Router/route')

const emsServer = express()

emsServer.use(cors())
emsServer.use(express.json())
emsServer.use(router)
emsServer.use('/uploads', express.static('./uploads'))

//port creation
const PORT = 4000 || process.env.PORT

//server listen
emsServer.listen(PORT, () => {
    console.log(('listening on port' + PORT));
})

//http - get resolving to http://localhost:4000/ -/
emsServer.get("/", (req, res) => {
    res.send(`<h1>Employee Management is started...</h1>`)
})

