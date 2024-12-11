import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DBProgress from '../../../DB/DBProgress';
const UserProgressScreen = ({navigation,route}) => {
    const { users } = route.params || {};
  const [progress, setProgress] = useState(null); // State to store user progress
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to handle errors
const dbProgress=new DBProgress();
  // Function to call GetProgress and fetch data
  const fetchProgress = () => {
    setLoading(true);
    setError(null);

    // Call GetProgress
    dbProgress.GetProgress(userId, lessonId, (success, result) => {
      console.log(result);
      if (success) {
        if (result.length > 0) {
          // Example: Aggregate progress from all records
          const totalQuizScore = result.reduce((total, record) => total + record.quiz_score, 0); // Sum all quiz scores
          const totalCompleted = result.reduce((count, record) => count + (record.completed === 1 ? 1 : 1), 0); // Count completed quizzes
    
          // Example: Progress logic based on completed quizzes and their scores
          const calculatedProgress = totalCompleted > 0 ? totalQuizScore / (totalCompleted * 100) : 0; // Normalize progress
          setProgress(calculatedProgress);
        } else {
          setProgress(0); // No progress if no records
        }
      } else {
        setError(result); // Set error message
      }
      setLoading(false);
    });
    
  };

  // Call fetchProgress on component mount
  useEffect(() => {
    
   fetchProgress();
  }, []);

  // Show loading indicator while fetching progress
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading your progress...</Text>
      </View>
    );
  }

  // Show error message if there's an issue
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Render progress UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      {/* Progress Bar Container */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progress * 100}%` }, // Set width dynamically
          ]}
        />
      </View>

      <Text style={styles.percentage}>{Math.round(progress * 100)}%</Text>
      <Text style={styles.description}>Keep going! You're almost there!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  progressBarBackground: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6200EE',
    borderRadius: 10,
  },
  percentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default UserProgressScreen;
