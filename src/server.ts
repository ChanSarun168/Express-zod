import app from "./app";
import connectToDatabase from "./utils/dbConnection";


const port = 3000;


const dataBase = ()=>{
    connectToDatabase().then(()=>{
        app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
        })
    })
}

export default dataBase;

