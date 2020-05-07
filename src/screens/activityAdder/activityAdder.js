import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ActivityAdder = () => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigate('HomeList')}>
            <View style={styles.backButton}>
              <Image
                style={styles.chevron}
                source={require('../../images/chevron-left.png')}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>Let's go!</Text>
          <Text>When are you free?</Text>
        </View>
        <View style={styles.activityAdder}>
          <View style={styles.rowItem}>
            <Text style={styles.itemHeaderText}>I'm free</Text>
            <Switch
              disabled={true}
              value={true}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#009846"
            />
          </View>
        </View>
        <Button title="save" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#FCFEFF',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    height: 50,
    width: 30,
    paddingTop: 10,
  },
  chevron: {
    height: 16,
    width: 16,
  },
  header: {
    height: 150,
    width: '100%',
    backgroundColor: '#D9E8FF',
    justifyContent: 'center',
    padding: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'AppleSDGothicNeo-Regular',
  },
  activityAdder: {
    flexDirection: 'row',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#01D060',
    width: '100%',
    height: 65,
    paddingHorizontal: 30,
  },
  itemHeaderText: {
    fontSize: 18,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ActivityAdder;
