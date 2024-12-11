import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import DBLanguage from '../DB/DBLanguage'
const Language = ({ route,navigation }) => {
  const users = route.params;
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [languages, setLanguages] = useState([]); // State to store the fetched languages

  const dbLanguage = new DBLanguage();

  useEffect(() => {
    
   dbLanguage.GetAllLanguages((success, data) => {
      if (success) {
        
        setLanguages(data);
      } else {
        console.error('Failed to fetch languages:', data);
      }
    });
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language); // Store the entire language object
    console.log("Selected Language:", language);
  };

  const handleNextButtonPress = () => {
    if (selectedLanguage) {
      navigation.navigate('TabNavigation', { users, selectedLanguage }); // Pass the entire selected language
    } else {
      console.warn("Please select a language before proceeding.");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.language_id}
      style={[
        styles.card,
        selectedLanguage?.language_id === item.language_id && styles.selectedCard, // Compare by language_id
      ]}
      onPress={() => handleLanguageSelect(item)} // Pass the entire object
    >
      <Text style={styles.languageText}>{item.language_name}</Text>
      {selectedLanguage?.language_id === item.language_id && ( // Compare by language_id
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✔</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('../assesst/logo2.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.appName}>Language Learning App</Text>

      {/* Language Selection Heading */}
      <Text style={styles.heading}>Choose Preferred Language</Text>
      <Text style={styles.subheading}>अपनी भाषा चुनिए</Text>
      <Text style={styles.subheading}>پسندیدہ زبان منتخب کریں</Text>

      {/* Language Cards */}
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.language_id.toString()}
        contentContainerStyle={styles.languageContainer}
        numColumns={2}
      />
      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextButtonPress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 5,
  },
  heading: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  languageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: 120,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginHorizontal: 10,
    position: 'relative',
    marginBottom: 15,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  languageImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  languageText: {
    fontSize: 14,
    color: '#000',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Language;
