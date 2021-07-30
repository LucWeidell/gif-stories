import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Comment = new Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true }, // TODO limit 250
    postId: { type: String, required: true },
    votes: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false }
  }, { timestamps: true, toJSON: { virtuals: true } }
)
export default Comment
