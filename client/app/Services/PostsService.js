import { ProxyState } from '../AppState.js'
import Post from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async getAllPosts() {
    debugger
    const posts = await api.get('api/posts')
    ProxyState.posts = posts.data.map(p => new Post(p))
    return posts
  }

  async getPostById(id) {
    const post = await api.get('api/posts/' + id)
    return post
  }

  async addPost(rawPost) {
    const post = await api.post('api/posts/', new Post(rawPost))
    return post
  }

  async removePost(id) {
    await api.post('api/posts/' + id)
    logger.log('Deleted Successfully')
  }
}
export const postsService = new PostsService()
