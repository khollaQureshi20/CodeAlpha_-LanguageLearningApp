import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  Dimensions,
} from 'react-native';
import DBLogin from '../DB/DBLogin';
const { width } = Dimensions.get('window');

const Register = ({navigation}) => {
  const dbLogin = new DBLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [isReminderEnabled, setIsReminderEnabled] = React.useState(false);
  const toggleSwitch = () => setIsReminderEnabled(!isReminderEnabled);

  const RegisterUser = async (username,email, password) => {
    // Simulate a login API call
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please enter username, email and password');
      return false;
    }

    try {
     
      dbLogin.RegisterUser(username,email,password, (success, result) => {
        console.log(result)
        if (success) {
          
          //navigation.navigate('Login');
        } else {
          // Login failed, show an error alert
          Alert.alert('Error', result); 
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../assesst/image.png')} 
        style={styles.illustration}
      />

      {/* Title and Subtitle */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Please register to login.</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#A1A1A1"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A1A1A1"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity>
            <Image
              source={require('../assesst/eye.jpg')} // Replace with an "eye" icon for visibility toggle
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reminder Toggle */}
      <View style={styles.reminderContainer}>
        <Text style={styles.reminderText}>Reminder me next time</Text>
        <Switch
          value={isReminderEnabled}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#DDD', true: '#4A90E2' }}
          thumbColor={isReminderEnabled ? '#FFF' : '#FFF'}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
  style={styles.signupButton}
  onPress={() => RegisterUser(username, email, password)} // Wrap the function call in an arrow function
>
  <Text style={styles.signupButtonText}>Sign Up</Text>
</TouchableOpacity>


      {/* Sign In Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Text style={styles.signinLink}>Sign In</Text>
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#5A4FCF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  reminderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reminderText: {
    color: '#777',
    fontSize: 14,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#5A4FCF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signinText: {
    color: '#777',
    fontSize: 14,
  },
  signinLink: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default Register;
