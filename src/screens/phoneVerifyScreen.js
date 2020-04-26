import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const PhoneVerifyScreen = () => {
  const [confirmtionCode, setConfirmationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [textFocus, changeFocus] = useState(false);
  const route = useRoute();
  const {phoneNumber} = route.params;

  const getConfirm = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmCode = async () => {
    try {
      await confirm.confirm(confirmtionCode);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>Let's</Text>
            <Text style={styles.subtitle}>Get verified!</Text>
          </View>
          <Image
            style={!textFocus ? styles.graphic : styles.graphic_hidden}
            source={require('../images/mailbox.png')}
          />
          <View style={styles.verfificationBox}>
            <Text style={styles.title}>Verification code</Text>
            <Text>Enter the code sent to</Text>
            <Text style={{color: '#0066FF'}}>{phoneNumber}</Text>
            <TextInput
              value={confirmtionCode}
              onChangeText={setConfirmationCode}
              style={styles.textInput}
              placeholder="123456"
              keyboardType="number-pad"
              placeholderTextColor="#8D8D8D"
              onFocus={() => changeFocus(true)}
              onBlur={() => changeFocus(false)}
            />
            <TouchableWithoutFeedback onPress={() => confirmCode()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Verify</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 25,
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
    width: 262,
    borderWidth: 1,
    color: 'black',
    borderColor: '#F1F3F6',
    borderRadius: 25,
    backgroundColor: '#F1F3F6',
    paddingLeft: 20,
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: '#0066FF',
    fontWeight: 'bold',
  },
  button: {
    height: 53,
    width: 150,
    backgroundColor: '#0066FF',
    color: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  graphic: {
    height: 200,
    width: 200,
  },
  graphic_hidden: {
    display: 'none',
  },
});

export default PhoneVerifyScreen;
