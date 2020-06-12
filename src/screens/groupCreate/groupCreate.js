import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {TextBox, Button} from '../../components';
import {colors, fonts} from '../../constants';
import {createGroup} from '../../firebase';

const GroupCreate = () => {
  const [groupName, setGroupName] = useState('');
  const [localFilepath, setLocalFilepath] = useState('');
  const [canSave, setCanSave] = useState(false);
  const imgageSource = {uri: localFilepath};
  const {navigate} = useNavigation();
  const lets = "Let's";
  const userData = useSelector((state) => state.user.data);

  useEffect(() => {
    if (groupName) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [groupName]);

  const hanldeImagePicker = () => {
    const options = {
      title: 'Select Group Photo',
      customButtons: [{name: 'emoji', title: 'Choose a group emoji'}],
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton === 'emoji') {
        console.log(response.customButton);
      } else {
        setLocalFilepath(response.uri);
      }
    });
  };

  const handleSave = async () => {
    setCanSave(false);
    const imagePath = localFilepath;
    try {
      await createGroup(groupName, imagePath, userData).then((group) => {
        navigate('Groups', {
          screen: 'GroupInfo',
          params: {groupUID: group.uid},
          initial: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <Text style={styles.logo}>{lets}</Text>
        <Text style={styles.subtitle}>Create a group</Text>
      </View>
      <View style={styles.infoBox}>
        <TouchableWithoutFeedback onPress={hanldeImagePicker}>
          {localFilepath ? (
            <Image style={styles.profilePhoto} source={imgageSource} />
          ) : (
            <View style={styles.profilePhoto}>
              <Icon name="camera" type="simple-line-icon" />
            </View>
          )}
        </TouchableWithoutFeedback>
        <View>
          <Text style={styles.inputTitle}>Group name</Text>
          <TextBox
            style={styles.nameInput}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Choose a name for your group"
          />
        </View>
      </View>
      <Button
        raised={true}
        disabled={!canSave}
        title="Next"
        onPress={handleSave}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 15,
  },
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    color: '#8D8D8D',
  },
  nameInput: {
    width: 220,
    fontFamily: fonts.body_regular,
  },
  inputTitle: {
    paddingLeft: 15,
    fontFamily: fonts.body_regular,
  },
  profilePhoto: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
});

export default GroupCreate;
