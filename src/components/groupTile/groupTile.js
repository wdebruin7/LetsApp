import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {getGroupMembersString, getDownloadURL} from '../../utils';
import {fonts, colors} from '../../constants';

const GroupTile = ({group}) => {
  const userData = useSelector((state) => state.user.data || {});
  const [photoRefURL, setPhotoRefURL] = useState('');
  const {navigate} = useNavigation();

  useEffect(() => {
    if (group.thumbnailImagePath) {
      getDownloadURL(group.thumbnailImagePath, setPhotoRefURL);
    }
  }, [group.thumbnailImagePath, group.uid]);

  const onPress = () => {
    navigate('GroupInfo', {group});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{group.name}</Text>
        <Text style={styles.members}>
          {getGroupMembersString(group, userData)}
        </Text>
      </View>
      <View style={styles.groupAvatar}>
        {!!photoRefURL && (
          <Image style={styles.groupPhoto} source={{uri: photoRefURL}} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 50,
    height: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EBF0F3',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 1, height: 3},
    flexDirection: 'row',
    marginHorizontal: 25,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  textContainer: {
    flex: 2,
    paddingLeft: 23,
    paddingTop: 15,
  },
  imageContainer: {
    flex: 1,
  },
  header: {
    fontFamily: fonts.body_medium,
    fontSize: 16,
  },
  members: {
    color: colors.mediumGrey,
    fontFamily: fonts.body_regular,
    fontSize: 13,
    paddingTop: 6,
    width: 200,
  },
  groupAvatar: {
    marginRight: 15,
    marginTop: 20,
  },
  groupPhoto: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});

export default GroupTile;
