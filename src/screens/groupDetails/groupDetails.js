import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useRoute, useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Button, TextBox} from '../../components';
import {fonts, colors} from '../../constants';
import {updateGroup} from '../../firebase';

const GroupDetails = () => {
  const {params} = useRoute();
  const [canSave, setCanSave] = useState(false);
  const navigation = useNavigation();
  const {group} = params;
  const [photoRefURL, setPhotoRefURL] = useState('');
  const [groupName, setGroupName] = useState(group.name);
  const [localFilepath, setLocalFilepath] = useState('');
  const memberNames = Object.values(group.members).map((member) => member.name);
  const imgageSource = {uri: localFilepath || photoRefURL};

  useEffect(() => {
    if (group && group.thumbnailImagePath) {
      const ref = storage().ref(`${group.uid}/thumbnail`);
      ref.getDownloadURL().then((url) => setPhotoRefURL(url));
    }
  }, [group]);

  useEffect(() => {
    if (localFilepath || group.name !== groupName) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [groupName, group.name, localFilepath]);

  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressSave = () => {
    updateGroup(group.uid, group.name, localFilepath, null);
    setLocalFilepath('');
  };

  const hanldeImagePicker = () => {
    const options = {
      title: 'Change Group Photo',
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

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeftChild}>
            <Button
              title={canSave ? 'Cancel' : ''}
              style={styles.headerLeft}
              icon={canSave ? null : <Icon name="chevron-left" type="entypo" />}
              onPress={onPressBack}
            />
          </View>
          <View style={{...styles.headerCenterChild, ...styles.headerTitle}}>
            <Text numberOfLines={1} style={styles.headerText}>
              Edit account info
            </Text>
          </View>
          <View style={styles.headerRightChild}>
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
        <View style={styles.groupInfo}>
          <TouchableWithoutFeedback onPress={hanldeImagePicker}>
            <View style={styles.groupInfoLeft}>
              <View style={styles.groupPhoto}>
                {photoRefURL ? (
                  <Image style={styles.groupPhoto} source={imgageSource} />
                ) : (
                  <Icon name="group" type="material-icons" size={30} />
                )}
              </View>
              <Text style={styles.photoHelpText}>Click to edit photo</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.groupInfoRight}>
            <Text style={styles.groupNameTitle}>Group name</Text>
            <TextBox
              style={styles.groupName}
              value={groupName}
              onChangeText={setGroupName}
            />
          </View>
        </View>
        <View style={styles.memberInfo}>
          <Text style={{...styles.headerText, ...styles.memberHeader}}>
            Members
          </Text>
          {memberNames.map((name) => {
            return (
              <View style={styles.memberNameBox}>
                <Text style={styles.memberName}>{name}</Text>
              </View>
            );
          })}
          <Button
            style={styles.leaveButton}
            raised={false}
            title="Leave group"
            textColor="red"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: colors.offwhite,
    flex: 1,
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
  headerLeftChild: {
    flex: 1,
  },
  headerCenterChild: {
    flex: 2,
  },
  headerRightChild: {
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
  headerText: {
    fontFamily: fonts.body_medium,
    fontSize: 18,
    color: colors.darkGrey,
  },
  groupPhoto: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupNameTitle: {
    fontFamily: fonts.body_regular,
    fontSize: 13,
    marginLeft: 25,
  },
  groupName: {
    fontFamily: fonts.body_semi_bold,
    fontSize: 16,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 25,
  },
  groupInfoLeft: {
    alignItems: 'center',
  },
  groupInfoRight: {
    marginLeft: 10,
  },
  photoHelpText: {
    paddingTop: 5,
    width: 80,
    textAlign: 'center',
    fontFamily: fonts.body_regular,
    color: colors.mediumGrey,
  },
  memberHeader: {
    marginBottom: 25,
  },
  memberInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  memberNameBox: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.borderGrey,
    justifyContent: 'center',
  },
  memberName: {
    fontFamily: fonts.body_regular,
    fontSize: 16,
    marginLeft: 50,
  },
  leaveButton: {
    marginTop: 25,
  },
});

export default GroupDetails;
