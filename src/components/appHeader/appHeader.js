import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getDownloadURL} from '../../utils';
import {colors, fonts} from '../../constants';
import {AddActivityButton} from '..';

const AppHeader = () => {
  const userData = useSelector((state) => state.user.data);
  const header = "Let's";
  const [downloadURL, setDownloadURL] = useState(undefined);
  const imageSource = {uri: downloadURL};
  const icon = {name: 'user', type: 'font-awesome', size: 24};
  const {navigate} = useNavigation();

  const onPressAvatar = () => {
    navigate('AccountUpdate', {update: true});
  };

  // useEffect(() => {
  //   if (userData && userData.profileImagePath) getDownloadURL(userData.profileImagePath, setDownloadURL);
  // }, [profileImagePath]);

  return (
    <View style={styles.container}>
      <View style={styles.leftButtons}>
        <TouchableOpacity style={styles.touchable} onPress={onPressAvatar}>
          {/* {downloadURL ? ( */}
          {/* <Avatar rounded source={imageSource} size={35} /> */}
          {/* ) : ( */}
          <Avatar rounded icon={icon} size={35} />
          {/* )} */}
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>{header}</Text>
      <View style={styles.rightButtons}>
        <AddActivityButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 55,
    width: Dimensions.get('window').width,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  rightButtons: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 30,
  },
  leftButtons: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    left: 30,
  },
  touchable: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: fonts.logo,
    fontSize: 30,
  },
});

export default AppHeader;
