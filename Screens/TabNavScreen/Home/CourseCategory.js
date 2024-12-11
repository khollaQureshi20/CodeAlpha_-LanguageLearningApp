
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CourseCategory = ({ title, courses }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={courses}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Image source={{ uri: item.image }} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseLessons}>{item.lessons}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 8,
  },
  courseLessons: {
    fontSize: 12,
    color: '#888',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});

export default CourseCategory;


