import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";


const { connect } = mongoose;

//route imports
import userRoute from "./routes/user.js";

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

//routes
app.use(userRoute);


const port = process.env.PORT || 5020;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});
