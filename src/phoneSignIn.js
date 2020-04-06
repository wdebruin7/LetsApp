import React, {useState} from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const normalizePhoneNumber = (value, previousValue) => {
  if (!value) return value;

  const currentValue = value.replace(/[^\d]/g, '');
  const currentValueLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (currentValueLength < 1) {
      return '';
    }

    if (currentValueLength < 2) {
      return `+${currentValue.slice(0, 1)}`;
    }

    if (currentValueLength < 5) {
      return `+${currentValue.slice(0, 1)} ${currentValue.slice(1)}`;
    }

    if (currentValueLength < 8) {
      return `+${currentValue.slice(0, 1)} ${currentValue.slice(
        1,
        4,
      )}-${currentValue.slice(4, 7)}`;
    }

    return `+${currentValue.slice(0, 1)} ${currentValue.slice(
      1,
      4,
    )}-${currentValue.slice(4, 7)}-${currentValue.slice(7, 11)}`;
  }
};

const validatePhoneNumber = (value) => {
  let error = '';
  if (!value) error = 'Required!';
  else if (value.length != 15) error = 'Invalid Format';
  return error;
};

function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

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
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
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
    );
  }

  return (
    <>
      <Button title="Confirm Code" onPress={() => confirmCode()} />
      <TextInput value={code} onChangeText={setCode} style={styles.textInput} />
    </>
  );
}

const styles = StyleSheet.create({
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
