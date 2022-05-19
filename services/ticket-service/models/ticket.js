import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ticketSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    name:{
      type: String,
      required: true
    },
    email:{
    type: String,
    required: true
    },
    phone:{
      type: String,
      required: true
    },
    total:{
      type: String,
      required: true
    },
    cart: {
      type: Array,
      required: true
    },
    isPaid:{
      type: Boolean,
      default: false
    },
    status:{
      type: Boolean,
      default: false
  },

  },
  {
    timestamps: true,
  }
);

export default model("Tickets", ticketSchema);
