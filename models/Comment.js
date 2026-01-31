class Comment {
  constructor(postId, content, author) {
    this.id = null; // ID sẽ được tự động gán
    this.postId = postId;
    this.content = content;
    this.author = author;
    this.isDeleted = false;
    this.createdAt = new Date();
  }
}

export default Comment;
