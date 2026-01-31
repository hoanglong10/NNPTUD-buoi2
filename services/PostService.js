class PostService {
  constructor() {
    this.posts = [];
  }

  // Tạo ID tự tăng (maxId + 1), lưu dạng chuỗi
  generateId() {
    if (this.posts.length === 0) return '1';
    const maxId = Math.max(...this.posts.map(p => parseInt(p.id)));
    return String(maxId + 1);
  }

  // CREATE - Tạo post mới
  createPost(post) {
    post.id = this.generateId();
    this.posts.push(post);
    console.log(`✅ Đã tạo post ID: ${post.id}`);
    return post;
  }

  // READ - Lấy tất cả posts (bao gồm cả đã xóa)
  getAllPosts(includeDeleted = false) {
    if (includeDeleted) {
      return this.posts;
    }
    return this.posts.filter(p => !p.isDeleted);
  }

  // READ - Lấy post theo ID
  getPostById(id) {
    return this.posts.find(p => p.id === String(id) && !p.isDeleted);
  }

  // UPDATE - Cập nhật post
  updatePost(id, updates) {
    const post = this.posts.find(p => p.id === String(id) && !p.isDeleted);
    if (!post) {
      console.log(`❌ Không tìm thấy post ID: ${id}`);
      return null;
    }
    Object.assign(post, updates);
    console.log(`✅ Đã cập nhật post ID: ${id}`);
    return post;
  }

  // DELETE - Xóa mềm (soft delete)
  deletePost(id) {
    const post = this.posts.find(p => p.id === String(id));
    if (!post) {
      console.log(`❌ Không tìm thấy post ID: ${id}`);
      return false;
    }
    post.isDeleted = true;
    console.log(`✅ Đã xóa mềm post ID: ${id}`);
    return true;
  }

  // Hiển thị posts với format đặc biệt cho posts đã xóa
  displayPosts() {
    console.log('\n========== DANH SÁCH POSTS ==========');
    this.posts.forEach(post => {
      if (post.isDeleted) {
        console.log(`\n--- [ĐÃ XÓA] ---`);
        console.log(`ID: ${post.id} (deleted)`);
        console.log(`Title: ---${post.title}---`);
        console.log(`Content: ---${post.content}---`);
        console.log(`Author: ---${post.author}---`);
        console.log(`---------------`);
      } else {
        console.log(`\nID: ${post.id}`);
        console.log(`Title: ${post.title}`);
        console.log(`Content: ${post.content}`);
        console.log(`Author: ${post.author}`);
      }
    });
    console.log('=====================================\n');
  }
}

export default PostService;
