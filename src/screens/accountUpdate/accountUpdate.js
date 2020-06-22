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
  Dimensions,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
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
      Alert.alert('Profile saved', "Let's get back to it!", [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
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

  const onPressSave = () => {
    if (!canSave) return;
    handleSave();
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSignOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerChild}>
              <Button
                title={canSave ? 'Cancel' : ''}
                style={styles.headerLeft}
                icon={
                  canSave ? null : <Icon name="chevron-left" type="entypo" />
                }
                onPress={onPressBack}
              />
            </View>
            <View style={{...styles.headerChild, ...styles.headerTitle}}>
              <Text>Edit account info</Text>
            </View>
            <View style={styles.headerChild}>
              {canSave ? (
                <Button
                  title="Save"
                  onPress={onPressSave}
                  bold
                  style={styles.headerRight}
                />
              ) : null}
            </View>
          </View>

          <View style={styles.body}>
            <TouchableOpacity onPress={hanldeImagePicker}>
              {localFilepath || photoURL ? (
                <Image style={styles.profilePhoto} source={imgageSource} />
              ) : (
                <View style={styles.profilePhoto}>
                  <Text style={styles.profilePhotoText}>
                    Select a profile photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

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
              title="Sign Out"
              textColor="#DC4E4E"
              onPress={onPressSignOut}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 45,
  },
  body: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
  },
  headerChild: {
    flex: 1,
  },
  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLeft: {
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  headerRight: {
    alignSelf: 'flex-end',
    marginRight: 25,
  },
  verfificationBox: {
    alignItems: 'flex-start',
    margin: 10,
  },
  infoTitleText: {
    color: '#8D8D8D',
    fontFamily: fonts.body_regular,
    marginTop: 10,
    paddingLeft: 10,
  },
  profilePhotoText: {
    fontSize: 14.5,
    fontFamily: fonts.body_regular,
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
