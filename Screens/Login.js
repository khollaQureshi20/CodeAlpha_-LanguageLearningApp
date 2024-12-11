import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import DBLogin from '../DB/DBLogin'
const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dbLogin = new DBLogin();
  const LoginUser = async (email, password) => {
   if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return false;
    }
    try {
    dbLogin.LoginUsers(email,password,(success, users) => {
        
      console.log('front',success,users)
      if (success) {
        navigation.navigate('Language', { users: users });
      } else {
        // Login failed, show an error alert
        Alert.alert('Error', users);  // result will contain either the error message or 'Invalid username or password'
      }
    });
  }
  catch (error) {
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
 };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logoText}>Language Learning</Text>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome back</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email/Phone Number"
        placeholderTextColor="#A1A1A1"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A1A1A1"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Remember Me and Forgot Password */}
      <View style={styles.optionsContainer}>
        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => LoginUser(email, password)}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text style={styles.orText}>Or Login with</Text>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <Image
            source={require('../assesst/facebook.png')} // Replace with your Facebook icon
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Image
            source={require('../assesst/google.jpg')} // Replace with your Google icon
            style={styles.iconImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Image
            source={require('../assesst/linkdin.png')} // Replace with your LinkedIn icon
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Up Text */}
      <TouchableOpacity   onPress={() => navigation.navigate('Register')}>
      <Text style={styles.signupText}>
        Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoText: {
    fontSize: 32,
    color: '#5A4FCF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#A1A1A1',
    fontSize: 14,
  },
  forgotPasswordText: {
    color: '#FF527B',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#5A4FCF',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#A1A1A1',
    fontSize: 14,
    marginBottom: 15,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  signupText: {
    color: '#A1A1A1',
    fontSize: 14,
  },
  signupLink: {
    color: '#FF527B',
    fontWeight: 'bold',
  },
});

export default Login;
