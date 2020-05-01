import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useSession} from '../../firebase/auth';
import {initializeUserInDatabase} from '../../firebase/firestore';
import {getDownloadURL} from '../../utils';

const AccountCreation = () => {
  const session = useSession();
  const userData = useSelector((state) => state.user.data);
  const [displayName, setDisplayname] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [localFilepath, setLocalFilepath] = useState('');
  const [canSave, setCanSave] = useState(true);
  const imgageSource = {uri: localFilepath || photoURL};

  useEffect(() => {
    if (!userData) return;
    if (userData.displayName && !displayName) {
      setDisplayname(userData.displayName);
    }
    if (userData.profileImagePath) {
      getDownloadURL(userData.profileImagePath, setPhotoURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    if (!displayName && !localFilepath) return;
    if (!localFilepath && userData.displayName === displayName) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [userData, displayName, localFilepath]);
  const uploadFile = async () => {
    const ref = storage().ref(`${userData.uid}/profileImagePath`);
    await ref.putFile(localFilepath);
    ref.getDownloadURL().then((url) => setPhotoURL(url));
  };

  const handleSave = async () => {
    setCanSave(false);
    const saveData = {};
    if (localFilepath) {
      await uploadFile();
      saveData.profileImagePath = `${userData.uid}/profileImagePath`;
      setLocalFilepath('');
    }
    if (displayName !== userData.displayName) {
      saveData.displayName = displayName;
    }
    try {
      await initializeUserInDatabase(saveData);
      Alert.alert('Profile saved', "Let's get back to it!");
    } catch (err) {
      console.log(err);
    }
  };
  const hanldeImagePicker = () => {
    const options = {
      title: 'Select Profile Photo',
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setLocalFilepath(response.uri);
      }
    });
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>Let's</Text>
            <Text style={styles.subtitle}>Create your acount!</Text>
          </View>
          <TouchableWithoutFeedback onPress={hanldeImagePicker}>
            {localFilepath || photoURL ? (
              <Image style={styles.profilePhoto} source={imgageSource} />
            ) : (
              <View style={styles.profilePhoto}>
                <Text style={styles.profilePhotoText}>
                  Select a profile photo
                </Text>
              </View>
            )}
          </TouchableWithoutFeedback>
          <View style={styles.verfificationBox}>
            <Text style={styles.infoTitleText}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={displayName}
              onChangeText={(e) => setDisplayname(e)}
              placeholder="Display Name"
            />
            <Text style={styles.infoTitleText}>Phone number</Text>
            <View style={{...styles.textInput, ...styles.notInteractive}}>
              <Text>{session.user && session.user.phoneNumber}</Text>
            </View>
          </View>
          <TouchableHighlight
            onPress={handleSave}
            style={
              canSave
                ? styles.button
                : {...styles.button, ...styles.notInteractive}
            }>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  verfificationBox: {
    alignItems: 'flex-start',
    margin: 10,
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
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: '#0066FF',
    fontWeight: 'bold',
  },
  infoTitleText: {
    color: '#8D8D8D',
    fontFamily: 'AppleSDGothicNeo-Regular',
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    height: 53,
    width: 150,
    backgroundColor: '#0066FF',
    color: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontWeight: 'bold',
  },
  profilePhotoText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: '#0066FF',
    textAlign: 'center',
    width: 90,
  },
  profilePhoto: {
    height: 140,
    width: 140,
    backgroundColor: '#EBF0F3',
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notInteractive: {
    opacity: 0.3,
  },
});

export default AccountCreation;
