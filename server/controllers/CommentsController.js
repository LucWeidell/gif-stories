import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/postid', this.getByPostId)
      .put('/id/', this.editScore)
      .post('', this.create)
      .delete('/:id', this.archive)
  }

  async editScore(req, res, next) {
    try {
      // FIXME broken
      const score = await commentsService.editScore()
      res.send({
        message: 'Score is:',
        score: score
      })
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const comment = await commentsService.getAll(req.query)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const comment = await commentsService.getById(req.params.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getByPostId(req, res, next) {
    try {
      const comment = await commentsService.getByPostId(req.params.id)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async archive(req, res, next) {
    try {
      const archive = await commentsService.archive(req.params.id, req.userInfo.id)
      res.send({ message: 'Archived comment', archive })
    } catch (error) {
      next(error)
    }
  }
}
