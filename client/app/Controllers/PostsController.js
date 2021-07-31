import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawAllPosts() {
  let template = ''
  ProxyState.posts.forEach(p => {
    template += p.Template
  })
  document.getElementById('giphydisplay').innerHTML = template
}

function _drawNewCreatePost() {
  return /* html */ `
    `
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawAllPosts)
    ProxyState.on('newPostGifs', _drawNewCreatePost)
    // this.getAllPosts()
  }

  async getAllPosts() {
    try {
      const posts = await postsService.getAllPosts()
      return posts
    } catch (error) {
      logger.log('Failed getting all posts:', error)
    }
  }

  async getPostById(id) {
    try {
      const post = await postsService.getPostById(id)
      return post
    } catch (error) {
      logger.log('Failed get post byID:', error)
    }
  }

  async removePost(id) {
    try {
      const post = await postsService.removePost(id)
      return post
    } catch (error) {
      logger.log('Failed removing post', error)
    }
  }

  async addPost(id) {
    try {
      const post = await postsService.addPost(id)
      return post
    } catch (error) {
      logger.log('Failed adding post', error)
    }
  }
}
