import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";


const { connect } = mongoose;

//route imports
import MovieRouter from "./routes/movies.js";
import catelogRouter from './routes/catelogRouter.js';
import movieuploadRoute from "./routes/upload.js";

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
app.use("/api",MovieRouter);
app.use('/api',catelogRouter);
app.use('/api',movieuploadRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

