import Post from './models/Post.js';
import Comment from './models/Comment.js';
import PostService from './services/PostService.js';
import CommentService from './services/CommentService.js';

// Khởi tạo services
const postService = new PostService();
const commentService = new CommentService();

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║        DEMO CRUD POSTS & COMMENTS WITH SOFT DELETE     ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// ==================== CRUD POSTS ====================
console.log('🔷 ===== CRUD POSTS =====\n');

// CREATE - Tạo posts (không cần truyền ID)
console.log('📝 CREATE - Tạo posts mới:');
const post1 = postService.createPost(new Post(
  'Học JavaScript cơ bản',
  'JavaScript là ngôn ngữ lập trình phổ biến nhất',
  'Nguyễn Văn A'
));

const post2 = postService.createPost(new Post(
  'Node.js cho người mới',
  'Node.js giúp chạy JavaScript trên server',
  'Trần Thị B'
));

const post3 = postService.createPost(new Post(
  'React vs Vue',
  'So sánh hai framework phổ biến',
  'Lê Văn C'
));

// READ - Hiển thị tất cả posts
console.log('\n📖 READ - Hiển thị tất cả posts:');
postService.displayPosts();

// UPDATE - Cập nhật post
console.log('✏️ UPDATE - Cập nhật post ID 2:');
postService.updatePost('2', {
  title: 'Node.js nâng cao',
  content: 'Tìm hiểu sâu về Node.js và Express'
});

// DELETE - Xóa mềm post
console.log('\n🗑️ DELETE - Xóa mềm post ID 1:');
postService.deletePost('1');

// Hiển thị lại sau khi xóa mềm
console.log('\n📖 Hiển thị posts sau khi xóa mềm (bao gồm cả posts đã xóa):');
postService.displayPosts();

// ==================== CRUD COMMENTS ====================
console.log('\n🔷 ===== CRUD COMMENTS =====\n');

// CREATE - Tạo comments
console.log('📝 CREATE - Tạo comments:');
const comment1 = commentService.createComment(new Comment(
  '2',
  'Bài viết rất hay và bổ ích!',
  'Phạm Văn D'
));

const comment2 = commentService.createComment(new Comment(
  '2',
  'Cảm ơn tác giả đã chia sẻ',
  'Hoàng Thị E'
));

const comment3 = commentService.createComment(new Comment(
  '3',
  'Tôi thích Vue hơn React',
  'Đỗ Văn F'
));

const comment4 = commentService.createComment(new Comment(
  '3',
  'React có cộng đồng lớn hơn',
  'Vũ Thị G'
));

// READ - Hiển thị tất cả comments
console.log('\n📖 READ - Hiển thị tất cả comments:');
commentService.displayComments();

// READ - Lấy comments theo postId
console.log('📖 READ - Lấy comments của post ID 2:');
const post2Comments = commentService.getCommentsByPostId('2');
console.log(post2Comments);

// UPDATE - Cập nhật comment
console.log('\n✏️ UPDATE - Cập nhật comment ID 1:');
commentService.updateComment('1', {
  content: 'Bài viết cực kỳ hay và chi tiết!'
});

// DELETE - Xóa mềm comment
console.log('\n🗑️ DELETE - Xóa mềm comment ID 3:');
commentService.deleteComment('3');

// Hiển thị lại sau khi xóa mềm
console.log('\n📖 Hiển thị comments sau khi xóa mềm (bao gồm cả comments đã xóa):');
commentService.displayComments();

// ==================== DEMO THÊM ====================
console.log('\n🔷 ===== DEMO THÊM =====\n');

// Tạo thêm post mới để test ID tự tăng
console.log('📝 Tạo post mới để kiểm tra ID tự tăng:');
const post4 = postService.createPost(new Post(
  'TypeScript là gì?',
  'TypeScript là superset của JavaScript',
  'Nguyễn Văn H'
));
console.log(`Post mới có ID: ${post4.id} (ID tự động tăng)\n`);

// Lấy chỉ posts chưa xóa
console.log('📖 Lấy chỉ posts chưa xóa:');
const activePosts = postService.getAllPosts(false);
console.log(`Số lượng posts đang hoạt động: ${activePosts.length}`);
activePosts.forEach(p => console.log(`- ID: ${p.id}, Title: ${p.title}`));

console.log('\n✅ HOÀN THÀNH DEMO!');
