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
import {getActivityParticipantsString} from '../../../utils';
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
    setUserIsParticipant(!!activity.participants[userData.uid]);
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
      <View style={styles.headerContainer}>
        {photoRefURL ? (
          <Image style={styles.groupPhoto} source={{uri: photoRefURL}} />
        ) : (
          <Avatar rounded icon={{name: 'group', type: 'font-awesome'}} />
        )}
        <Text style={{...styles.nameElement, ...styles.nameText}}>
          {group.name}
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.textInfoContainer}>
          {activity.name ? (
            <Text style={{...styles.semiBoldInfoText}}>{activity.name}</Text>
          ) : null}
          <Text style={styles.participants}>
            {getActivityParticipantsString(activity, userData, undefined, true)}
          </Text>
        </View>
        <Switch
          trackColor={{false: colors.darkGrey, true: colors.brightGreen}}
          thumbColor="white"
          ios_backgroundColor={colors.darkGrey}
          onValueChange={handleSwitchToggle}
          value={userIsParticipant}
          style={styles.switch}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    marginHorizontal: 25,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 3},
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 23,
    paddingTop: 20,
  },
  nameText: {
    fontFamily: fonts.body_medium,
    fontSize: 16,
    color: colors.darkGrey,
  },
  semiBoldInfoText: {
    fontFamily: fonts.body_semi_bold,
    fontSize: 14,
    color: colors.darkGrey,
  },
  nameElement: {
    paddingLeft: 11,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 23,
  },
  textInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  members: {
    color: colors.mediumGrey,
    fontSize: 13,
    fontFamily: fonts.body_regular,
  },
  participants: {
    fontSize: 13,
    fontFamily: fonts.bodyItalic,
    color: colors.mediumGrey,
  },
  switch: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
  },
  groupPhoto: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default ActivityTile;
