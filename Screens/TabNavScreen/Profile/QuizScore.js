import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DBProgress from '../../../DB/DBProgress';
// Assuming dbProgress.GetScore function is available for importing

const QuizScore = ({ navigation }) => {
  const [quizStats, setQuizStats] = useState({
    language_name:'english',
    stage_name:'Basic',
    scorePercentage: 80,
  });
  const dbProgress=new DBProgress();
  const [progress, setProgress] = useState([]);

  // Fetch the progress using the GetScore function
  useEffect(() => {
  
    
      dbProgress.GetScore((success, result) => {
        if (success) {
          setProgress(result);
          const scoreData = result[0] || {}; // Assuming the first result contains the necessary score data
          if (scoreData.quiz_score) {
            setQuizStats({
              language_name: scoreData.language_name || 'Urdu',
              stage_name: scoreData.stage_name || 'Basic',
              scorePercentage: scoreData.quiz_score || 80,
            });
          }
        } else {
          console.error('Error fetching progress:', result);
        }
      });
    
  }, []);

  // Determine feedback based on score percentage
  const getFeedback = () => {
    const { scorePercentage } = quizStats;

    if (scorePercentage === 0) {
      return {
        stars: [false, false, false],
        emoji: '😔',
        message: 'Better luck next time!',
      };
    } else if (scorePercentage > 0 && scorePercentage <= 49) {
      return {
        stars: [true, false, false],
        emoji: '🙂',
        message: 'Not bad!',
      };
    } else if (scorePercentage >= 50 && scorePercentage <= 80) {
      return {
        stars: [true, true, false],
        emoji: '😊',
        message: 'Well done!',
      };
    } else if (scorePercentage >= 90 && scorePercentage < 100) {
      return {
        stars: [true, true, 'half'],
        emoji: '😀',
        message: 'Great job!',
      };
    } else if (scorePercentage === 100) {
      return {
        stars: [true, true, true],
        emoji: '😄',
        message: 'Excellent!',
      };
    }
    return {
      stars: [false, false, false],
      emoji: '',
      message: '',
    }; // Fallback if scorePercentage is invalid
  };

  const feedback = getFeedback() || {
    stars: [false, false, false],
    emoji: '',
    message: '',
  };

  return (
    <View style={styles.container}>
      <View style={styles.winBox}>
        <Text style={styles.title}>Quiz Completed</Text>
        <Text style={styles.levelText}>{feedback.message}</Text>
        <Text style={styles.emojiText}>{feedback.emoji}</Text>

        {/* Render Stars */}
        <View style={styles.starsContainer}>
          {feedback.stars.map((filled, index) => {
            if (filled === 'half') {
              return <Icon key={index} name="star-half" size={40} color="#FFD700" />;
            }
            return (
              <Icon
                key={index}
                name="star"
                size={40}
                color={filled ? '#FFD700' : '#d3d3d3'}
              />
            );
          })}
        </View>

        <Text style={styles.scoreText}>language Name:{quizStats.language_name} </Text>
        <Text style={styles.scoreText}>Stage Name: {quizStats.stage_name}</Text>
        <Text style={styles.scoreText}>Score Percentage: {quizStats.scorePercentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e3d91',
  },
  winBox: {
    backgroundColor: '#f7a1f7',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: 320,
    elevation: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  emojiText: {
    fontSize: 40,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});

export default QuizScore;
