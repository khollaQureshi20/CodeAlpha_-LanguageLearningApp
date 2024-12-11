import DBHandler from './DBHandler';
class DBPost {
    constructor() {
      this.dbHandler = new DBHandler();
      this.dbHandler.initializeDatabase();
    }
  
    // Upload a new post in the forum_post table
    UploadPost(userId, title, content, callback) {
      this.dbHandler.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO forum_posts (user_id, title, content) VALUES (?, ?, ?)`, // SQL query for inserting data
          [userId, title, content], // Parameters to be inserted into the table
          (_, result) => {
            console.log('Post uploaded successfully:', result);
            callback(true, 'Post uploaded successfully'); // Notify the callback that the post was uploaded
          },
          (_, error) => {
            console.error('Error uploading post:', error);
            callback(false, 'Error uploading post'); // Notify the callback if an error occurred
            return false; // Stop the transaction
          }
        );
      });
    }
    GetAllPosts(callback) {
        this.dbHandler.db.transaction(tx => {
          tx.executeSql(
            `SELECT 
    forum_posts.post_id AS post_id,
    forum_posts.title AS post_title,
    forum_posts.content AS post_content,
    users.user_id AS user_id,  
    users.username AS user_name,  
    users.email AS user_email,
    COUNT(forum_comments.comment_id) AS total_comments 
FROM forum_posts
LEFT JOIN users
    ON forum_posts.user_id = users.user_id
LEFT JOIN forum_comments
    ON forum_comments.post_id = forum_posts.post_id
GROUP BY forum_posts.post_id, users.username, users.email;  
;
`, // SQL query to fetch all records from the forum_post table
            [],
            (_, { rows }) => {
              const posts = [];
              for (let i = 0; i < rows.length; i++) {
                posts.push(rows.item(i)); // Add each row to the posts array
              }
              console.log('All posts fetched successfully:', posts);
              callback(true, posts); // Pass the posts array to the callback
            },
            (_, error) => {
              console.error('Error fetching posts:', error);
              callback(false, 'Error fetching posts');
              return false; // Stop the transaction
            }
          );
        });
      }
      GetAllComments(callback) {
        this.dbHandler.db.transaction(tx => {
          tx.executeSql(
            `SELECT forum_post.id AS post_id, 
                    forum_post.title AS post_title, 
                    forum_comments.comment, 
                    forum_comments.user_id, 
                    COUNT(forum_comments.id) OVER (PARTITION BY forum_post.id) AS comment_count
             FROM forum_post
             LEFT JOIN forum_comments ON forum_comments.post_id = forum_post.id`,
            [],
            (_, { rows: resultRows }) => {
              const postsWithComments = [];
              let currentPost = null;
    
              // Process the result set
              for (let i = 0; i < resultRows.length; i++) {
                const row = resultRows.item(i);
                
                // Check if it's a new post
                if (!currentPost || currentPost.post_id !== row.post_id) {
                  if (currentPost) {
                    postsWithComments.push(currentPost); // Push previous post
                  }
                  
                  // Initialize new post
                  currentPost = {
                    post_id: row.post_id,
                    post_title: row.post_title,
                    comment_count: row.comment_count,
                    comments: []
                  };
                }
                
                // Add the comment to the current post
                currentPost.comments.push({
                  comment: row.comment,
                  user_id: row.user_id
                });
              }
              
              // Push the last post
              if (currentPost) {
                postsWithComments.push(currentPost);
              }
    
              console.log('Posts with comments and count fetched successfully:', postsWithComments);
              callback(true, postsWithComments); // Pass the result to the callback
            },
            (_, error) => {
              console.error('Error fetching posts and comments:', error);
              callback(false, 'Error fetching posts and comments');
            }
          );
        });
      }
      AddReply(userId, postId,comment, callback) {
        
        this.dbHandler.db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO forum_comments (user_id, post_id, comment) VALUES (?, ?, ?)`, // SQL query for inserting data
            [userId, postId, comment], // Parameters to be inserted into the table
            (_, result) => {
              console.log('Post uploaded successfully:', result);
              callback(true, 'Post uploaded successfully'); // Notify the callback that the post was uploaded
            },
            (_, error) => {
              console.error('Error uploading post:', error);
              callback(false, 'Error uploading post'); // Notify the callback if an error occurred
              return false; // Stop the transaction
            }
          );
        });
      }
  }
  
  export default DBPost;
  