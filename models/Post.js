class Post {
  constructor(title, content, author) {
    this.id = null; // ID sẽ được tự động gán
    this.title = title;
    this.content = content;
    this.author = author;
    this.isDeleted = false;
    this.createdAt = new Date();
  }
}

export default Post;
