class CommentService {
  constructor() {
    this.comments = [];
  }

  // Tạo ID tự tăng (maxId + 1), lưu dạng chuỗi
  generateId() {
    if (this.comments.length === 0) return '1';
    const maxId = Math.max(...this.comments.map(c => parseInt(c.id)));
    return String(maxId + 1);
  }

  // CREATE - Tạo comment mới
  createComment(comment) {
    comment.id = this.generateId();
    this.comments.push(comment);
    console.log(`✅ Đã tạo comment ID: ${comment.id} cho post ID: ${comment.postId}`);
    return comment;
  }

  // READ - Lấy tất cả comments
  getAllComments(includeDeleted = false) {
    if (includeDeleted) {
      return this.comments;
    }
    return this.comments.filter(c => !c.isDeleted);
  }

  // READ - Lấy comments theo postId
  getCommentsByPostId(postId, includeDeleted = false) {
    const comments = this.comments.filter(c => c.postId === String(postId));
    if (includeDeleted) {
      return comments;
    }
    return comments.filter(c => !c.isDeleted);
  }

  // READ - Lấy comment theo ID
  getCommentById(id) {
    return this.comments.find(c => c.id === String(id) && !c.isDeleted);
  }

  // UPDATE - Cập nhật comment
  updateComment(id, updates) {
    const comment = this.comments.find(c => c.id === String(id) && !c.isDeleted);
    if (!comment) {
      console.log(`❌ Không tìm thấy comment ID: ${id}`);
      return null;
    }
    Object.assign(comment, updates);
    console.log(`✅ Đã cập nhật comment ID: ${id}`);
    return comment;
  }

  // DELETE - Xóa mềm (soft delete)
  deleteComment(id) {
    const comment = this.comments.find(c => c.id === String(id));
    if (!comment) {
      console.log(`❌ Không tìm thấy comment ID: ${id}`);
      return false;
    }
    comment.isDeleted = true;
    console.log(`✅ Đã xóa mềm comment ID: ${id}`);
    return true;
  }

  // Hiển thị comments với format đặc biệt cho comments đã xóa
  displayComments(postId = null) {
    console.log('\n========== DANH SÁCH COMMENTS ==========');
    let commentsToDisplay = postId 
      ? this.comments.filter(c => c.postId === String(postId))
      : this.comments;

    commentsToDisplay.forEach(comment => {
      if (comment.isDeleted) {
        console.log(`\n--- [ĐÃ XÓA] ---`);
        console.log(`ID: ${comment.id} (deleted)`);
        console.log(`Post ID: ${comment.postId}`);
        console.log(`Content: ---${comment.content}---`);
        console.log(`Author: ---${comment.author}---`);
        console.log(`---------------`);
      } else {
        console.log(`\nID: ${comment.id}`);
        console.log(`Post ID: ${comment.postId}`);
        console.log(`Content: ${comment.content}`);
        console.log(`Author: ${comment.author}`);
      }
    });
    console.log('=========================================\n');
  }
}

export default CommentService;
