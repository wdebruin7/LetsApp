import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  Keyboard,
  Alert,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSession, setUserData} from '../../firebase';
import {getDownloadURL} from '../../utils';
import {Button, TextBox} from '../../components';
import Colors from '../../constants/colors';
import {fonts} from '../../constants';

const AccountCreation = () => {
  const session = useSession();
  const userData = useSelector((state) => state.user.data);
  const [displayName, setDisplayname] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [localFilepath, setLocalFilepath] = useState('');
  const [canSave, setCanSave] = useState(false);
  const imgageSource = {uri: localFilepath || photoURL};
  const {params} = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (!userData || userData === {}) return;
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
    if (
      localFilepath ||
      userData.displayName !== displayName ||
      !userData.userDataConfirmed
    ) {
      setCanSave(true);
    } else {
      setCanSave(false);
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
    if (
      displayName &&
      (displayName !== userData.displayName || !userData.userDataConfirmed)
    ) {
      saveData.displayName = displayName;
    }
    try {
      await setUserData(saveData);
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

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {params && params.update ? (
            <TouchableOpacity
              containerStyle={styles.backButton}
              onPress={onPressBack}>
              <Icon name="chevron-left" type="entypo" />
            </TouchableOpacity>
          ) : null}

          <View style={styles.header}>
            <Text style={styles.logo}>Let&apos;s</Text>
            <Text style={styles.subtitle}>
              {params && params.update
                ? 'Update your account!'
                : 'Create your acount!'}
            </Text>
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
            <TextBox
              value={displayName}
              onChangeText={setDisplayname}
              placeholder="Display Name"
            />
            <Text style={styles.infoTitleText}>Phone number</Text>
            <TextBox
              disabled={true}
              value={session.user && session.user.phoneNumber}
            />
          </View>

          <Button
            onPress={handleSave}
            title="save"
            disabled={!canSave}
            width={150}
            raised
          />
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 25,
    marginLeft: 25,
  },
  logo: {
    fontFamily: fonts.logo,
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
  verfificationBox: {
    alignItems: 'flex-start',
    margin: 10,
  },
  infoTitleText: {
    color: '#8D8D8D',
    fontFamily: 'AppleSDGothicNeo-Regular',
    marginTop: 10,
    paddingLeft: 10,
  },
  profilePhotoText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: Colors.primaryBlue,
    textAlign: 'center',
    width: 90,
  },
  profilePhoto: {
    height: 140,
    width: 140,
    backgroundColor: Colors.lightGrey,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountCreation;
