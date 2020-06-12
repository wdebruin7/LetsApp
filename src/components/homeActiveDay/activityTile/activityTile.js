import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {
  getGroupMembersString,
  getActivityParticipantsString,
} from '../../../utils';
import {colors, fonts} from '../../../constants';

const ActivityTile = ({activity, group}) => {
  const [photoRefURL, setPhotoRefURL] = useState('');
  const userData = useSelector((state) => state.user.data);
  const [userIsParticipant, setUserIsParticipant] = useState(false);
  const {navigate} = useNavigation();

  const handleSwitchToggle = () => {
    setUserIsParticipant(!userIsParticipant);
  };

  const onTilePress = () => {
    navigate('Groups', {
      screen: 'GroupInfo',
      params: {groupUID: activity.group.uid},
      initial: false,
    });
  };

  useEffect(() => {
    if (!userData || userData === {}) return;
    setUserIsParticipant(activity.participants[userData.uid] !== undefined);
  }, [userData, activity]);

  useEffect(() => {
    if (group.thumbnailImagePath) {
      const ref = storage().ref(`${group.uid}/thumbnail`);
      ref.getDownloadURL().then((url) => setPhotoRefURL(url));
    }
  }, [group.thumbnailImagePath, group.uid]);

  if (!(activity && group)) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={onTilePress}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{group.name}</Text>
        <Text style={styles.members}>
          {getGroupMembersString(group, userData)}
        </Text>
        <Text style={styles.participants}>
          {getActivityParticipantsString(activity, userData, userIsParticipant)}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Switch
          trackColor={{false: colors.darkGrey, true: colors.brightGreen}}
          thumbColor="white"
          ios_backgroundColor={colors.darkGrey}
          onValueChange={handleSwitchToggle}
          value={userIsParticipant}
          style={styles.switch}
        />
        <View style={styles.groupAvatar}>
          {photoRefURL ? (
            <Image style={styles.groupPhoto} source={{uri: photoRefURL}} />
          ) : (
            <Avatar rounded title={group.name[0]} size={50} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 25,
    marginVertical: 10,
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 3},
    flexDirection: 'row',
  },
  textContainer: {
    flex: 2,
    paddingLeft: 23,
    paddingTop: 20,
  },
  header: {
    fontFamily: fonts.body_medium,
    fontSize: 16,
  },
  members: {
    color: colors.mediumGrey,
    fontSize: 13,
    paddingTop: 6,
    fontFamily: fonts.body_regular,
  },
  participants: {
    paddingTop: 10,
    fontSize: 13,
    fontFamily: fonts.body_regular,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
    marginTop: 15,
    marginRight: 10,
  },
  groupAvatar: {
    marginRight: 15,
    marginBottom: 15,
  },
  groupPhoto: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default ActivityTile;
