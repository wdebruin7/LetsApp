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
          <Button title="Phone Number Sign In" onPress={handleSubmit} />
          <TextInput
            value={phoneNumber}
            onChangeText={handleNumberChange}
            style={styles.textInput}
            keyboardType="phone-pad"
            maxLength={15}
            placeholder="+1 650-555-1234"
          />
          {error ? <Text>{error}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 20,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
});

export default PhoneSignIn;
