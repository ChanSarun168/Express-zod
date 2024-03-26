import express, { Application , Request , Response} from 'express'
import connectToDatabase from './utils/dbConnection';
import errorHandler from './middlewares/errorHandler';
import { userRouter } from './routers/users.route';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
// import { swaggerDocument } from './swagger';
import redoc from "redoc-express";
import * as swaggerDocument from '../public/swagger.json'

const app:Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true,limit:"30mb"}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static("public"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get(
    "/docs",
    redoc({
      title: "API Docs",
      specUrl: "/swagger.json",
      redocOptions: {
        theme: {
          colors: {
            primary: {
              main: "#6EC5AB",
            },
          },
          typography: {
            fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
            fontSize: "15px",
            lineHeight: "1.5",
            code: {
              code: "#87E8C7",
              backgroundColor: "#4D4D4E",
            },
          },
          menu: {
            backgroundColor: "#ffffff",
          },
        },
      },
    })
  );
app.use("/users",userRouter);

// global handler
app.use(errorHandler)

// open port and connect to database
connectToDatabase().then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    })
})

export default app;