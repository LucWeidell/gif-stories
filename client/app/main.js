
import { AuthController } from './Controllers/AuthController.js'
import { PostsController } from './Controllers/PostsController.js'
import { SocketTestController } from './Controllers/SocketTestController.js'
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();

  postsController = new PostsController();
  socketTestController = new SocketTestController();
}

// @ts-ignore
window.app = new App()
