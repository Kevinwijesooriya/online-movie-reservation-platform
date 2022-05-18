import mongoose from "mongoose";
const { Schema, model } = mongoose;

const locationSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

export default model("Locations", locationSchema);
