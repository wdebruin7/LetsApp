import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import {useNavigation, useNavigationParam} from 'react-navigation-hooks';
import auth from '@react-native-firebase/auth';
import {useSession} from '../firebase/auth';

const PhoneVerify = ({route}) => {
  const [confirmtionCode, setConfirmationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const session = useSession();

  const {navigate} = useNavigation();
  const phoneNumber = useNavigationParam('phoneNumber');

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

  if (session.user) {
    navigate('App');
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Button title="Confirm Code" onPress={() => confirmCode()} />
          <TextInput
            value={confirmtionCode}
            onChangeText={setConfirmationCode}
            style={styles.textInput}
            placeholder="123456"
            keyboardType="number-pad"
          />
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
export default PhoneVerify;
