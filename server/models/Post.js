import mongoose from 'mongoose'
import { dbContext } from '../db/DbContext'
const Schema = mongoose.Schema

const Post = new Schema({
  title: { type: Number, required: true },
  userId: { type: String, required: true },
  gifsUrl: [{ type: String, required: true }] // requires exactly 4 strings
}, { timestamps: true, toJSON: { virtuals: true } }
)

Post.post('findOneAndDelete', async(doc, next) => {
  await dbContext.Comments.deleteMany({ postId: doc._id })
  next()
})

export default Post
