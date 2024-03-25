import express, { Application , Request , Response} from 'express'
import connectToDatabase from './utils/dbConnection';
import errorHandler from './middlewares/errorHandler';
import { userRouter } from './routers/users.route';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';

const app:Application = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended:true,limit:"30mb"}));
app.use(bodyParser.json());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user",userRouter);

// global handler
app.use(errorHandler)

// open port and connect to database
connectToDatabase().then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    })
})

export default app;