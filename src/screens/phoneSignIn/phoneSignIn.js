import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-input';
import {normalizePhoneNumber, validatePhoneNumber} from '../../utils';
import {Button} from '../../components';

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  const [phoneNumber, setPhoneNumber] = useState('+1');
  const [error, setError] = useState('');

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

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>Let's</Text>
            <Text style={styles.subtitle}>Get started!</Text>
          </View>
          <Image
            style={styles.graphic}
            source={require('../../images/smartphone.png')}
          />
          <View style={styles.verfificationBox}>
            <Text style={styles.title}>Verify your number</Text>
            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              textStyle={styles.textInput}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 300}}
              value={phoneNumber}
              onChangePhoneNumber={handleNumberChange}
              onSelectCountry={() =>
                setPhoneNumber(`+${this.phone.getCountryCode()}`)
              }
            />
            <Button onPress={handleSubmit} buttonText="Send Code" />
            {error ? <Text>{error}</Text> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 15,
  },
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    fontFamily: 'Trebuchet MS',
    paddingBottom: 10,
    fontSize: 58,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#8D8D8D',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verfificationBox: {
    alignItems: 'center',
    flex: 3,
    margin: 20,
  },
  textInput: {
    fontSize: 13,
    height: 36,
    width: 220,
    borderWidth: 1,
    color: 'black',
    borderColor: '#F1F3F6',
    borderRadius: 25,
    backgroundColor: '#F1F3F6',
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: '#0066FF',
    fontWeight: 'bold',
  },
  graphic: {
    height: 150,
    width: 150,
  },
});

export default PhoneSignIn;
