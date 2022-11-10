import express from "express";;

// Routes
import routeUser from './Routes/UserRoute';
import routeTeacher from './Routes/TeacherRoute';
import routeDiscipline from './Routes/DisciplineRoute'

const app = express();
const PORT = 3000;

app.use(express.json());

routeUser(app);
routeTeacher(app);
routeDiscipline(app);

app.listen(PORT, ()=>{
    console.log("Server running on port" + PORT);
})
