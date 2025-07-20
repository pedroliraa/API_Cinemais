import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema({

  userId: { type: String, required: true },
  mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true }

}, { timestamps: true })


export default mongoose.model('Favorite', FavoriteSchema)