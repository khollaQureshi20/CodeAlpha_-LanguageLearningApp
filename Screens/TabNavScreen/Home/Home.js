import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CourseCategory from './CourseCategory';

import DBStage from '../../../DB/DBStage'; // Assuming you have this DB file
import Language from '../../Language';

const Home = ({ navigation, route }) => {
  const { users, selectedLanguage } = route.params || {}; // Access passed data
  const [stages, setStages] = useState([]); // State to store stages

  const dbStage = new DBStage();

  // Fetch stages on component mount
  useEffect(() => {
    dbStage.GetAllStages((success, data) => {
      if (success) {
        setStages(data); // Set fetched stages
      } else {
        console.error('Failed to fetch stages:', data);
      }
    });
    console.log(stages);
  }, []);

  // Function to handle stage click
  const handleStageClick = (stage) => {
    navigation.navigate('Course', {selectedLanguage,stage});
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello</Text>
        <Text style={styles.name}>kholla</Text>

        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
          style={styles.avatar}
        />
      </View>

      {/* Banner */}
      <Image
        source={require('../../../assesst/englishbanner.png')}
        style={styles.banner}
      />
      <Text style={styles.name}>{selectedLanguage?.language_name}</Text>

      {/* Stages Section */}
      <View>
        <Text style={styles.heading}>Available Stages</Text>
        {stages.map((stage) => (
          <TouchableOpacity
            key={stage.stage_id}
            style={styles.stageCard}
            onPress={() => handleStageClick(stage)} // Handle stage click
          >
            <Text style={styles.stageName}>{stage.stage_name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  banner: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  stageCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  stageName: {
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#FF527B',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
