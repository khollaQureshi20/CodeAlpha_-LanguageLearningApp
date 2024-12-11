import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import DBAcheviement from '../../../DB/DBAcheviement';

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState(null);
  const dbAchievement = new DBAcheviement();

  useEffect(() => {
    // Fetch achievements from the database when the component mounts
    dbAchievement.GetAllAchievement((err, achievements) => {
      if (err) {
        setError('Failed to load achievements');
        console.error(err);
      } else {
        setAchievements(achievements);
        console.log(achievements); // Debugging to check the structure
      }
    });
  }, []);

  const renderAchievement = ({ item }) => (
    <View style={styles.achievement}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.points}>Points: {item.points}</Text>
      {item.completed ? (
        <Button
          title="Completed"
          onPress={() => Alert.alert(`Reward collected for ${item.name}`)}
        />
      ) : (
        <Text style={styles.emptyReward}>Reward Locked</Text>
      )}
    </View>
  );

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Achievements</Text>
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  achievement: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  points: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  emptyReward: {
    fontSize: 14,
    color: '#999',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Achievement;
