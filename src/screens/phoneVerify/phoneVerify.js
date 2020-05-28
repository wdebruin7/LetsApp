import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  Keyboard,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Button, TextBox} from '../../components';
import Colors from '../../constants/colors';
import {fonts, colors} from '../../constants';

const PhoneVerify = () => {
  const [confirmtionCode, setConfirmationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [textFocus, changeFocus] = useState(false);
  const route = useRoute();
  const {phoneNumber} = route.params;
  const lets = "Let's";

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
            <Text style={styles.logo}>{lets}</Text>
            <Text style={styles.subtitle}>Get verified!</Text>
          </View>
          <Image
            style={!textFocus ? styles.graphic : styles.graphic_hidden}
            source={require('../../images/mailbox.png')}
          />
          <View style={styles.verfificationBox}>
            <Text style={styles.title}>Verification code</Text>
            <Text style={styles.bodyText}>Enter the code sent to</Text>
            <Text style={styles.phoneNubmer}>{phoneNumber}</Text>
            <TextBox
              value={confirmtionCode}
              onChangeText={setConfirmationCode}
              placeholder="123456"
              keyboardType="number-pad"
              placeholderTextColor="#8D8D8D"
              onFocus={() => changeFocus(true)}
              onBlur={() => changeFocus(false)}
            />
            <Button onPress={() => confirmCode()} title="Verify" raised />
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
    fontFamily: fonts.logo,
    paddingBottom: 10,
    fontSize: 58,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.body_medium,
    fontSize: 18,
    textAlign: 'center',
    color: colors.mediumGrey,
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
  title: {
    fontSize: 18,
    fontFamily: fonts.body_bold,
    color: colors.primaryBlue,
  },
  graphic: {
    height: 200,
    width: 200,
  },
  graphic_hidden: {
    display: 'none',
  },
  bodyText: {
    fontFamily: fonts.body_light,
    marginTop: 10,
  },
  phoneNubmer: {
    fontFamily: fonts.body_bold,
    color: colors.primaryBlue,
    marginBottom: 5,
  },
});

export default PhoneVerify;
