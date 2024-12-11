import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Quiz3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Translate Sentence</Text>
      <Text style={styles.question}>Pouvez-vous répéter, s’il vous plaît.</Text>
      <Text style={styles.subtext}>in English</Text>

      <TextInput style={styles.input} placeholder="Type your answer here..." />

      <TouchableOpacity style={styles.continueButton} onPress={()=>{navigation.navigate('Score')}}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 30,
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
});

export default Quiz3;
