import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker

export default function ProfileScreen({ route, navigation }) {
  const { users } = route.params || {};
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/women/44.jpg'); // Initial image

  const openImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You did not select any image');
      } else if (response.errorCode) {
        Alert.alert('Error', 'An error occurred while selecting the image');
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source.uri); // Update the profile image
      }
    });
  };

  return (
    <LinearGradient colors={['#ff758c', '#ff7eb3']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profileImage }} // Use the updated profile image URI
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={openImagePicker}>
            <Icon name="create-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>kholla</Text>
        <Text style={styles.location}>kholla123@gmail.com</Text>
      </View>

      {/* Buttons Section */}
      <ScrollView style={styles.menu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <Icon name="school-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Progress Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Post')}
        >
          <Icon name="document-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Achievement')}
        >
          <Icon name="trophy-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Achievement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('QuizScore')}
        >
          <Icon name="school-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Quiz Score</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#ff7eb3',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  menu: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
});
