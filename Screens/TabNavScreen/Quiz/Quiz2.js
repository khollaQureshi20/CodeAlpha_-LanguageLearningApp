import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const pairs = [
  { id: 1, text: 'word' },
  { id: 2, text: 'appeler' },
  { id: 3, text: 'herbe' },
  { id: 4, text: 'beau' },
  { id: 5, text: 'to deliver' },
  { id: 6, text: 'book' },
  { id: 7, text: 'grass' },
  { id: 8, text: 'beautiful' },
];

const Quiz2 = ({navigation}) => {
  const [selectedPairs, setSelectedPairs] = useState([]);

  const handlePairPress = (id) => {
    if (selectedPairs.includes(id)) {
      // Deselect the pair if already selected
      setSelectedPairs(selectedPairs.filter(pairId => pairId !== id));
    } else {
      // Add the pair to the selected list
      setSelectedPairs([...selectedPairs, id]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap the pairs</Text>

      <View style={styles.pairsContainer}>
        {pairs.map(pair => (
          <TouchableOpacity
            key={pair.id}
            style={[
              styles.pair,
              selectedPairs.includes(pair.id) && styles.selectedPair, // Highlight if selected
            ]}
            onPress={() => handlePairPress(pair.id)} // Handle selection
          >
            <Text style={styles.pairText}>{pair.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={()=>{navigation.navigate('Quiz3')}}>
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
  pairsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  pair: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    width: Dimensions.get('window').width / 2.4, // Adjust width dynamically
  },
  selectedPair: {
    backgroundColor: '#D6B0FF', // Highlight color
    borderColor: '#6B47C9',
  },
  pairText: {
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
});

export default Quiz2;
