import { ProxyState } from '../AppState.js'

export default class Post {
  constructor({ id, title, userId, gifsUrl, votes = 0, commentCount = 0 }) {
    this.id = id
    this.userId = userId
    this.title = title
    this.gifsUrl = gifsUrl // array of strings
    // TODO get all votes and save
    this.votes = votes
    this.commentCount = commentCount
  }

  get Template() {
    return `
    <div class="card post-border">
    <div class="card-header">
      <div class="row">
        <div class="col-2 p-2"> <img src='${this.gifsUrl[0]}' alt="Smiley face">
        </div>
        <div class="col-2 p-1"> <img src='${this.gifsUrl[1]}' alt="Smiley face">
        </div>
        <div class="col-2 p-1"> <img src='${this.gifsUrl[2]}' alt="Smiley face">
        </div>
        <div class="col-2 p-1"> <img src='${this.gifsUrl[3]}' alt="Smiley face">
        </div>
        <div class="col-1 p-1">
          <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#post${this.title}">+/-</button>
        </div>
        <div class="col-3 score">
          <p id="postocunt">Post Count: <span id=${this.id}-post-count>0</p>
          <p id="score">Score: <span id=${this.id}-score>0</span></p>
        </div>
        <div class="col-md-12 collapse side-bar-scroll" id="post${this.title}">
          <div class="black-border card-body;">
          ${getCommentTemplate(this.id)}
            <div class="card-footer p-2">
              <form onsubmit="app.commentsController.addComment('${this.id}')">
                <input type="text" class="form-control" style="width: 1100px;" minlength="3" and maxlength="250" name="content" id="content"
                  placeholder="Add comments..." required>
                <button type="submit" class="btn btn-outline-success">+</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
  }
}
function getCommentTemplate(id) {
  const postComments = ProxyState.comments.filter(c => c.postId === id)
  let template = ''
  postComments.forEach(c => {
    template += c.Template
  })
  return template
}
