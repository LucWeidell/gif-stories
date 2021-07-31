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
  let template = ''
  const gifStringUrls = ProxyState.newPostGifs
  template += `
    <div class="col-3">
      <div>
        <img class="w-100" src='${gifStringUrls[0]}' alt="re-reoll">
        <button type="button" class="btn btn-primary" onclick="app.postsController.newOneGif(0)">Roll</button>
      </div>
    </div>
    <div class="col-3">
      <div>
        <img class="w-100" src='${gifStringUrls[1]}' alt="re-reoll">
        <button type="button" class="btn btn-primary" onclick="app.postsController.newOneGif(1)">Roll</button>
      </div>
    </div>
    <div class="col-3">
      <div>
        <img class="w-100" src='${gifStringUrls[2]}' alt="re-reoll">
        <button type="button" class="btn btn-primary" onclick="app.postsController.newOneGif(2)">Roll</button>
      </div>
    </div>
    <div class="col-3">
      <div>
        <img class="w-100" src='${gifStringUrls[3]}' alt="re-reoll">
        <button type="button" class="btn btn-primary" onclick="app.postsController.newOneGif(3)">Roll</button>
      </div>
    </div>
    <div class="col-12">
      <button type="button" class="btn btn-primary" onclick="app.postsController.newAllGif()">Roll
        All</button>
    </div>
    `

  document.getElementById('modal-create').innerHTML = template
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawAllPosts)
    ProxyState.on('newPostGifs', _drawNewCreatePost)
    ProxyState.on('comments', _drawAllPosts)
    // this.getAllPosts()
  }

  async newAllGif() {
    try {
      ProxyState.newPostGifs = []
      while (ProxyState.newPostGifs.length <= 3) {
        await postsService.getOneGif()
      }
    } catch (error) {
      logger.log('Error getting gifs from giphy:', error)
    }
  }

  async newOneGif(index) {
    try {
      await postsService.getOneGif(index)
    } catch (error) {
      logger.log('Error swtitching one gif:', error)
    }
  }

  async getAllPosts() {
    try {
      const posts = await postsService.getAllPosts()
      return posts
    } catch (error) {
      logger.log('Failed getting all posts:', error)
    }s
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
