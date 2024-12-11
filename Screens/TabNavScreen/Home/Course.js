import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DBLesson from '../../../DB/DBLesson'; 

const Course = ({ navigation, route }) => {
  const { stage, selectedLanguage } = route.params || {};
  const [lessons, setLessons] = useState([]); 
  const dbLesson = new DBLesson();

 
  useEffect(() => {
    if (stage?.stage_id) {
      dbLesson.GetLesson(stage.stage_id,selectedLanguage.language_id, (success, lessons) => {
        console.log('lesson data',lessons)
        if (success) {
          setLessons(lessons); // Set lessons fetched
        } else {
          console.error('Failed to fetch lessons:', data);
        }
      });
      console.log(lessons)
    }
  }, [stage,selectedLanguage]);

  const renderContentItem = ({ item }) => (
    
    <TouchableOpacity
      style={styles.contentItem}
      onPress={() => { navigation.navigate('CourseContent',{item}); }}
    >
      <Text style={styles.itemNumber}>
        {String(item.lesson_id).padStart(2, '0')} {/* Convert lesson_id to string */}
      </Text>
      <Text style={styles.itemTitle}>{item.lesson_name}</Text>
      <Icon name="play-circle" size={24} color="#007BFF" />
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
           <Icon name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{selectedLanguage.language_name} Basics</Text>
        <TouchableOpacity>
         {/**<Icon name="more-vert" size={24} color="black" /> / */} 
        </TouchableOpacity>
      </View>

      {/* Course Details */}
      <View style={styles.courseDetails}>
        <Image
          source={require('../../../assesst/englishposter.jpeg')} // Replace with the actual image URL
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>{selectedLanguage.language_name} Basics</Text>
        <Text style={styles.courseAuthor}>By Tubeguru</Text>
        <Text style={styles.courseDescription}>
          English is a general-purpose, high-level language. Its
          design philosophy emphasizes code readability with its notable use of
          significant whitespace.
        </Text>
      </View>
      
      {/* Course Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Course Content</Text>
        <Text style={styles.lessonCount}>
          {lessons.length} Lessons Available
        </Text>
        <FlatList
          data={lessons}
          renderItem={renderContentItem}
          keyExtractor={(item) => item.lesson_id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDetails: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseAuthor: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#444',
  },
  contentContainer: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lessonCount: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginRight: 16,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default Course;
