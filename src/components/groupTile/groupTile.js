import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {getGroupMembersString, getDownloadURL} from '../../utils';

const GroupTile = ({group}) => {
  const userData = useSelector((state) => state.user.data || {});
  const [photoURL, setPhotoURl] = useState('');
  const {navigate} = useNavigation();
  const imageSource = {uri: photoURL};

  useEffect(() => {
    if (userData.thumbnailImagePath) {
      getDownloadURL(userData.thumbnailImagePath, setPhotoURl);
    }
  }, [userData.thumbnailImagePath]);

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
      <View style={styles.imageContainer}>
        {photoURL ? <Avatar rounded source={imageSource} size={30} /> : null}
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
    paddingTop: 20,
  },
  imageContainer: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  members: {
    color: '#8D8D8D',
    fontSize: 13,
    paddingTop: 6,
  },
});

export default GroupTile;
