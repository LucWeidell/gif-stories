import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { Post as PostSchema } from '../models/Post'
import { AccountSchema } from '../models/Account'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema)
}

export const dbContext = new DbContext()
