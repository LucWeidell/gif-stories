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

  async getByIdnComCount(id) {
    let Totalscore = 0
    const arrcount = 0

    const exists = await dbContext.Posts.findById(id)
    if (!exists) {
      throw new BadRequest('Invalid Id')
    }
    const existscom = await dbContext.Comments.find({ postId: id })
    if (!exists) {
      Totalscore = 0
    }
    if (existscom) {
      for (let i = 0; i < existscom.length; i++) {
        Totalscore += existscom[i].votes
      }
    }
    const obj = {}
    obj[arrcount] = {
      post: exists,
      comments: [...existscom],
      totalScore: Totalscore
    }
    return obj
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    return post
  }

  async remove(id, user) {
    await this.getById(id)
    const deleted = await dbContext.Posts.findOneAndDelete({ _id: id, userId: user })
    if (!deleted) {
      throw new BadRequest('not able to delete')
    }
    return deleted
  }
}

export const postsService = new PostsService()
