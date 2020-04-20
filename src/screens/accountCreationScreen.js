import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';

const AccountCreationScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>Let's</Text>
            <Text style={styles.subtitle}>Create your acount!</Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.profilePhoto}>
              <Text style={styles.buttonText}>Select a profile photo</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.verfificationBox}>
            <Text style={styles.title}>Name</Text>
            <TextInput />
            <Text style={styles.title}>Phone number</Text>
            <TextInput />
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
    height: 150,
    width: 150,
  },
});

export default AccountCreationScreen;
