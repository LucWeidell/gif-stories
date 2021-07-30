import { commentsService } from "../services/ComentsService"
import BaseController from "../utils/BaseController"

export class CommentsController extends BaseController {
  constructor(){
    super('api/comments')
    this.router
      .get('', this.getAll),
      .get('/:id', this.getById),
      .post('', this.create),
      .delete('/:id', this.archived)
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

  async create(req, res, next) {
    try {
      req.body.userId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  /* TODO call comment remover for all comments in this comment */
  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.id, req.userInfo.id)
      res.send({ message: 'Delorted comment!' })
    } catch (error) {
      next(error)
    }
  }

  async archived(req, res, next) {
    
  }
}