import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    total: {
      type: String,
      required: true,
    },
    ticket_id: {
      type: String,
      required: true,
      unique: true,
    },
    
  
  },
  {
    timestamps: true,
  }
);

export default model("Payments", paymentSchema);
