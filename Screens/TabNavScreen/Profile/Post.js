import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DBPost from '../../../DB/DBPost';
const Post = ({ navigation}) => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [commentVisible, setCommentVisible] = useState(null); // Track visibility per post
  const [comment, setComment] = useState('');
  
const dbPost=new DBPost();
const fetchPosts = () => {
  dbPost.GetAllPosts((success, posts) => {
    if (success) {
      setPosts(posts); // Update state with fetched posts
    } else {
      console.error('Error fetching posts:', posts); // Handle error
    }
  });
};
useEffect(() => {
  fetchPosts(); // Call fetchPosts to load the posts when the component is mounted
}, []);
  const handleCommentPress = (id) => {
    setCommentVisible(commentVisible === id ? null : id); // Toggle visibility based on post ID
  };

  const handlePostComment = (postId,userid) => {
  
    // Call the AddReply method to save the comment to the database
    dbPost.AddReply(userid, postId, comment, (success) => {
      if (success) {
        console.log(`Comment posted successfully for Post ${postId}: ${comment}`);
        setComment(''); 
        setCommentVisible(null); 
        fetchPosts()
      } else {
        console.error('Failed to post comment');
      }
    });
  };
  

  const renderDiscussionItem = ({ item }) => (
    <View style={styles.discussionCard}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{item.post_title}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user_name}</Text>
        <Text style={styles.time}>{item.user_email}</Text>
      </View>
      <Text style={styles.time}>{item.post_content}</Text>
      <View style={styles.footer}>
        <Text style={styles.replies}>{item.total_comments} replies</Text>
        <TouchableOpacity onPress={() => handleCommentPress(item.post_id)}>
          <Text style={styles.saveText}>Replies</Text>
        </TouchableOpacity>
      </View>
  
      {/* Comment Section */}
      {commentVisible === item.post_id && (
        <View style={styles.commentSection}>
          <Text style={styles.commentText}>Comments:</Text>
          {/* Render TextInput for writing a comment */}
          <TextInput
            style={styles.textInput}
            placeholder="Write a comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => handlePostComment(item.post_id,item.user_id)}
          >
            <Text style={styles.postButtonText}>Post Comment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.createPostContainer}>
          <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('CreatePost')}>
            <Text style={styles.startButtonText}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Display posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.post_id.toString()}
        renderItem={renderDiscussionItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    
    paddingHorizontal: 10,
    
  },
  createPostContainer: {
    alignItems: 'center', // Center the button horizontally
  },
  startButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#000',
  },
  listContent: {
    padding: 10,
  },
  discussionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  category: {
    backgroundColor: '#7B1FA2',
    color: '#FFF',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  tag: {
    backgroundColor: '#EDE7F6',
    color: '#7B1FA2',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginRight: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#AAA',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  replies: {
    fontSize: 14,
    color: '#555',
  },
  saveText: {
    fontSize: 14,
    color: '#1E90FF',
  },
  commentSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 10,
  },
  commentList: {
    marginBottom: 10,
  },
  comment: {
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    color: '#666',
  },
  textInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Post;
