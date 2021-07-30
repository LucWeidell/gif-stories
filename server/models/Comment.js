import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const Comment = new Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true }, // limit 250
    postId: { type: String, required: true },
    votes: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
