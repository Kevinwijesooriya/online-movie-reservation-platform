import mongoose from "mongoose";
const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    catelog:{
      type: Array,
    },
    
    images: {
      type: String,
    },
    cast: {
      type: Array,
      // default: [],
    },
    duration: {
      type: String,
      required: true,
    },
    availableTheaters: [
      {
        theater:String,
        showTime: {
          type: Array,
          required: true,
        },
        

      }
    ],
   
  },
  {
    timestamps: true,
  }
);

export default model("Movie", movieSchema);
