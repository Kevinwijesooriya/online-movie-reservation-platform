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
    showTime: {
      type: Array,
      required: true,
    },
    banner: {
      type: String,
    },
    cast: {
      type: Array,
      default: [],
    },
    duration: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

export default model("Movie", movieSchema);
