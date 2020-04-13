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
import {useSession} from '../firebase/auth';
import {normalizePhoneNumber} from '../functions/normalizePhoneNumber';
import {validatePhoneNumber} from '../functions/validatePhoneNumber';

function PhoneSignIn({navigation}) {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const session = useSession();

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
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (err) {
      console.log(err);
    }
  }

  if (session.user) {
    navigation.navigate('App');
  }

  if (!confirm) {
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
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Button title="Confirm Code" onPress={() => confirmCode()} />
          <TextInput
            value={code}
            onChangeText={setCode}
            style={styles.textInput}
            placeholder="123456"
            keyboardType="number-pad"
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

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
