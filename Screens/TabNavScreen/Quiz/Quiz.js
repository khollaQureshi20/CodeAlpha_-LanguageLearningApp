import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DBQuiz from '../../../DB/DBQuiz';

const Quiz = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const dbQuiz = new DBQuiz();

  // Fetch quizzes on component mount
  useEffect(() => {
    dbQuiz.Getquiz((success, quiz) => {
      if (success) {
        const filteredQuizzes = quiz.filter(q => q.lesson_id === 1);
        setQuizzes(filteredQuizzes);
      } else {
        console.log('Failed to fetch quizzes:', quiz);
      }
    });
  }, []);

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Mark the option as selected
  };

  // Handle the continue button click
  const handleContinue = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1); // Show the next quiz
      setSelectedOption(null); // Reset the selected option for the new question
    } else {
      console.log('Last quiz reached');
    }
  };

  // Handle finish button click
  const handleFinish = () => {
    navigation.navigate('TabNavigation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the correct option</Text>

      {quizzes.length > 0 && currentQuizIndex < quizzes.length ? (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>{quizzes[currentQuizIndex].question}</Text>
          <Text style={styles.subtext}>in English</Text>

          <View style={styles.optionsContainer}>
            {/* Dynamically render quiz options */}
            {[quizzes[currentQuizIndex].option_1, quizzes[currentQuizIndex].option_2, quizzes[currentQuizIndex].option_3].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption, // Apply selected styling
                ]}
                onPress={() => handleOptionSelect(option)} // Select the option
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {currentQuizIndex < quizzes.length - 1 ? (
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.continueButton} onPress={handleFinish}>
              <Text style={styles.continueText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.errorText}>No quizzes available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F6FF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B47C9',
    marginVertical: 10,
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  quizContainer: {
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    width: Dimensions.get('window').width / 2.4,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#7CB9E8', // Change color to blue when selected
    borderColor: '#6B47C9',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#6B47C9',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Quiz;
