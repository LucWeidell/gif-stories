import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Post = new Schema({
  title: { type: Number, required: true },
  userId: { type: String, required: true },
  gifsUrl: [{ type: String, required: true }] // requires exactly 4 strings
}, { timestamps: true, toJSON: { virtuals: true } }
)

export default Post
