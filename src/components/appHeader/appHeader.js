import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';

const AppHeader = () => {
  const {photoURL} = useSelector((state) => state.user.data || {});
  const header = "Let's";
  const imageSource = {uri: photoURL};
  const icon = {name: 'user', type: 'font-awesome', size: 24};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{header}</Text>
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.touchable}>
          <Icon name="bell" type="font-awesome" size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable}>
          {photoURL ? (
            <Avatar rounded source={imageSource} size={35} />
          ) : (
            <Avatar rounded icon={icon} size={35} />
          )}
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
    fontFamily: 'Trebuchet MS',
    fontSize: 30,
  },
});

export default AppHeader;
