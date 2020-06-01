import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {getGroupMembersString} from '../../utils';
import {colors, fonts} from '../../constants';

const GroupSelect = ({group, onToggleGroup}) => {
  const userData = useSelector((state) => state.user.data || {});
  const [photoRefURL, setPhotoRefURL] = useState('');

  useEffect(() => {
    if (group.thumbnailImagePath) {
      const ref = storage().ref(`${group.uid}/thumbnail`);
      ref.getDownloadURL().then((url) => setPhotoRefURL(url));
    }
  }, [group.thumbnailImagePath, group.uid]);

  return (
    <TouchableOpacity onPress={onToggleGroup}>
      <View style={styles.container}>
        <View style={styles.groupAvatar}>
          {photoRefURL ? (
            <Image style={styles.groupPhoto} source={{uri: photoRefURL}} />
          ) : (
            <Avatar rounded title={group.name[0]} size={60} />
          )}
        </View>
        <View style={styles.textView}>
          <Text style={styles.titleText}>{group.name}</Text>
          <Text style={styles.subtitleText}>
            {getGroupMembersString(group, userData)}
          </Text>
        </View>
        <Icon
          type="font-awesome"
          name={group.selected ? 'check-circle' : 'circle-thin'}
          containerStyle={styles.icon}
          color={group.selected ? colors.primaryBlue : '#BCBCBC'}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'column',
    marginLeft: 15,
    height: '100%',
    width: 250,
  },
  titleText: {
    paddingTop: 4,
    fontFamily: fonts.body_bold,
    fontSize: 18,
  },
  subtitleText: {
    color: colors.mediumGrey,
    fontFamily: fonts.body_regular,
    paddingTop: 3,
    fontSize: 14,
  },
  icon: {
    // alignSelf: 'center',
    // position: 'absolute',
    // right: 20,
    marginLeft: 15,
  },
  groupAvatar: {
    height: 60,
    width: 60,
    borderRadius: 60,
    marginLeft: 15,
  },
  groupPhoto: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: colors.mediumGrey,
  },
});

export default GroupSelect;
