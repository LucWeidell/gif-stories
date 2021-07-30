import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
import { commentsService } from '../services/CommentsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.remove)
      .delete('/:id/comments', this.removeCommentsByPost)
  }

  async getAll(req, res, next) {
    try {
      const post = await postsService.getAll(req.query)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      const post = await postsService.create(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  /* TODO call comment remover for all comments in this post */
  async remove(req, res, next) {
    try {
      await postsService.remove(req.params.id, req.userInfo.id)
      res.send({ message: 'Delorted Post!' })
    } catch (error) {
      next(error)
    }
  }

  async removeCommentsByPost(req, res, next) {
    try {
      await commentsService.remove(req.params.id)
      res.send({ message: 'Deleted Comments!' })
    } catch (error) {
      next(error)
    }
  }
}
