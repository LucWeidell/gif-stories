import { ProxyState } from '../AppState.js'
import Post from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api, giphyApi } from './AxiosService.js'

class PostsService {
  async getOneGif(index = 5) {
    let gifUrls = ProxyState.newPostGifs
    const gif = await giphyApi.get('')
    const gifString = gif.data.data.fixed_width_downsampled_url
    if (index !== 5) {
      gifUrls.splice(index, 1, gifString)
    } else {
      gifUrls = [...gifUrls, gifString]
    }
    ProxyState.newPostGifs = gifUrls
  }

  async getAllPosts() {
    const posts = await api.get('api/posts')
    ProxyState.posts = posts.data.map(p => new Post(p))
    return posts
  }

  async getPostById(id) {
    const post = await api.get('api/posts/' + id)
    return post
  }

  async addPost() {
    // TODO look at all post title get largest now set in proxy largest title
    const rawPost = {
      gifsUrl: ProxyState.newPostGifs,
      title: (ProxyState.largestTitle + 1)
    }
    const post = await api.post('api/posts/', rawPost)
    ProxyState.largestTitle++
    ProxyState.posts = [...ProxyState.posts, new Post(post.data)]
    return post
  }

  async removePost(id) {
    await api.post('api/posts/' + id)
    logger.log('Deleted Successfully')
  }
}
export const postsService = new PostsService()
