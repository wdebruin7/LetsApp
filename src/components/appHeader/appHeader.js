import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {getDownloadURL} from '../../utils';

const AppHeader = () => {
  const {profileImagePath} = useSelector((state) => state.user.data || {});
  const header = "Let's";
  const [downloadURL, setDownloadURL] = useState(undefined);
  const imageSource = {uri: downloadURL};
  const icon = {name: 'user', type: 'font-awesome', size: 24};

  // useEffect(() => {
  //   if (profileImagePath) getDownloadURL(profileImagePath, setDownloadURL);
  // }, [profileImagePath]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{header}</Text>
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.touchable}>
          <Icon name="bell" type="font-awesome" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          {/* {downloadURL ? ( */}
          {/* <Avatar rounded source={imageSource} size={35} /> */}
          {/* ) : ( */}
          <Avatar rounded icon={icon} size={35} />
          {/* )} */}
        </TouchableOpacity>
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
  },
  rightButtons: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    right: 10,
  },
  touchable: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    marginRight: 10,
  },
  text: {
    fontFamily: 'Shadows Into Light Two',
    fontSize: 30,
  },
});

export default AppHeader;
