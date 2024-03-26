import app from "./app";
import connectToDatabase from "./utils/dbConnection";

const port = 5000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
