import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from 'express-fileupload';


const { connect } = mongoose;

//route imports
import uploadRoute from "./routes/upload.js";
import theatersRouter from "./routes/theater.js";
import locationsRouter from "./routes/location.js";
// Connect MongoDB.
const URI = process.env.MONGODB_URL;
connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const app = express();
app.use(json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))

//routes
app.use(uploadRoute);
app.use(theatersRouter);
app.use(locationsRouter);


const port = process.env.PORT || 5080;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});
