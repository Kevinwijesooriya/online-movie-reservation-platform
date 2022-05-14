import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reservationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    seatingArea: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Reservation", reservationSchema);
