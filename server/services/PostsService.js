import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }

  async getById(id) {
    const exists = await dbContext.Posts.findById(id)
    if (!exists) {
      throw new BadRequest('Invalid Id')
    }
    return exists
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    return post
  }

  async remove(id, user) {
    const postToRemove = await this.getById(id)
    if (postToRemove.userId == user) {
      return await dbContext.Posts.findByIdAndDelete(id)
    }
    throw new Forbidden()
  }
}

export const postsService = new PostsService()
