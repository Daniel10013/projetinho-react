import express from "express";

import { route } from "./Routes/Route";

const app = express()
const PORT = 3000

app.use(express.json())

route(app)

app.listen(PORT, ()=>{
    console.log("Server running on port" + PORT);
})
