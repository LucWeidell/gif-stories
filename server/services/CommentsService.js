import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

function _isNotAuthorized(id, userId) {
  if (id !== userId) {
    return new Forbidden()
  } else {
    return false
  }
}

class CommentsService {
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }

  async getById(id) {
    const exists = await dbContext.Comments.findById(id)
    if (!exists) {
      throw new BadRequest('Invalid Id')
    }
    return exists
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }

  // Note this changes the comment isArchived to true
  async archive(id, userId) {
    const commentToArchive = await this.getById(id)
    if (!_isNotAuthorized(commentToArchive.userId, userId)) {
      commentToArchive.isArchived = true
      const update = await dbContext.Comments.findByIdAndUpdate(commentToArchive.id, commentToArchive, { new: true, runValidators: true })
      return update
    }
    throw new BadRequest('could not update')
  }
}

export const commentsService = new CommentsService()
