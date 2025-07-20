import mongoose from "mongoose"

const MediaSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {

        type: String,
        required: true,
        enum: ['movie', 'series'], 
        
    },
    releaseYear: { type: Number, required: true },
    genre: { type: String, required: true }

}, { timestamps: true })

export default mongoose.model('Media', MediaSchema)