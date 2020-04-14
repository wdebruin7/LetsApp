import React, {useState} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import {useSession} from '../firebase/auth';
import normalizePhoneNumber from '../functions/normalizePhoneNumber';
import validatePhoneNumber from '../functions/validatePhoneNumber';

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const session = useSession();

  const {navigate} = useNavigation();

  const handleNumberChange = (text) => {
    setPhoneNumber(normalizePhoneNumber(text), phoneNumber);
  };

  const handleSubmit = () => {
    const validationError = validatePhoneNumber(phoneNumber);
    setError(validationError);
    if (!validationError) {
      signInWithPhoneNumber();
    }
  };

  // Handle the button press
  async function signInWithPhoneNumber() {
    try {
      navigate('Verify', {phoneNumber});
    } catch (err) {
      console.log(err);
    }
  }

  if (session.user) {
    navigate('App');
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.logo}>Let's</Text>
            <Text style={styles.subtitle}>Get started!</Text>
          </View>
          <Image style ={styles.graphic} source={require('../images/smartphone 1.png')}></Image>
          <View style={styles.verfificationBox}>
            <View style={styles.title}></View>
            <TextInput
            value={phoneNumber}
            onChangeText={handleNumberChange}
            style={styles.textInput}
            keyboardType="phone-pad"
            maxLength={15}
            placeholder="+1 650-555-1234"
            placeholderTextColor={'#8D8D8D'}
            />
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Send Code</Text>
              </View>
            </TouchableWithoutFeedback>
            {error ? <Text>{error}</Text> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  logo: {
    fontFamily : 'Trebuchet MS',
    paddingBottom: 10,
    fontSize: 58,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#8D8D8D'
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  verfificationBox: {
    alignItems: 'center'
  },
  textInput: {
    fontSize: 13,
    height: 36,
    width: 262,
    borderWidth: 1,
    color: 'black',
    borderColor: '#F1F3F6',
    borderRadius: 25,
    backgroundColor: '#F1F3F6',
    paddingLeft: 20
  },
  button: {
    height: 53,
    width: 150,
    backgroundColor: '#0066FF',
    color: 'white',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: { 
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  graphic: {
    height: 200,
    width: 200
  }
});

export default PhoneSignIn;
