import pkg from 'mongoose';
const { Schema, model } = pkg;


const catelogSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

export default model("Catelog", catelogSchema)