import express from "express";;

// Routes
import routeUser from './Routes/UserRoute';
import routeTeacher from './Routes/TeacherRoute';

const app = express();
const PORT = 3000;

app.use(express.json());

routeUser(app);
routeTeacher(app);

app.listen(PORT, ()=>{
    console.log("Server running on port" + PORT);
})
