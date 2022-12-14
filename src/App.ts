import express from "express";;
import cors from "cors"

// Routes
import routeUser from './Routes/UserRoute';
import routeTeacher from './Routes/TeacherRoute';
import routeDiscipline from './Routes/DisciplineRoute';
import routeClassRoom from './Routes/ClassRoomRoute';
import routeClass from "./Routes/ClassRoute";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

routeUser(app);
routeTeacher(app);
routeDiscipline(app);
routeClassRoom(app);
routeClass(app);

app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})
