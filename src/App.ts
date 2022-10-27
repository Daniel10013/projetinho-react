import express from "express";

import routeUser from './Routes/UserRoute'

const app = express()
const PORT = 3000

app.use(express.json())

routeUser(app)

app.listen(PORT, ()=>{
    console.log("Server running on port" + PORT);
})
