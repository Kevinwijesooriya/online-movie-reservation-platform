import mongoose from "mongoose";
const { Schema, model } = mongoose;

const theaterSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    images:{
        type: Object,
        required: true
    },
    location:{
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true

})

export default model("Theaters", theaterSchema);