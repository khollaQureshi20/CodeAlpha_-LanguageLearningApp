import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DBPost from '../../../DB/DBPost';
const CreatePost = ({navigation}) => {
  const [title, setTitle] = useState('');
  const dbPost=new DBPost();
  const [postContent, setPostContent] = useState('');

  const handleCancel = () => {
    navigation.navigate('Post');
    console.log('Post creation canceled');
  };

  const handlePost = () => {
    const userId = 1; // Replace with actual user ID from authentication or context
    dbPost.UploadPost(userId, title, postContent, (success, message) => {
      if (success) {
        console.log('Post submitted:', { title, postContent });
        navigation.navigate('Post'); // Navigate back to the Post screen after successful submission
      } else {
        console.error('Failed to upload post:', message);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Post Title Input */}
      <TextInput
        style={styles.titleInput}
        placeholder="Enter post title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      {/* Post Content Input */}
      <TextInput
        style={styles.postContentInput}
        placeholder="Write post..."
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelButton: {
    fontSize: 16,
    color: '#FF0000',
  },
  postButton: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  tagsInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  postContentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 200,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default CreatePost;
