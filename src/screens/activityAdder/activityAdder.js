import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const ActivityAdder = () => {
  const {navigate} = useNavigation();
  const route = useRoute();
  let selectedDates = {};
  if (route.params && route.params.markedDates) {
    selectedDates = route.params.markedDates;
  }
  console.log(selectedDates);

  const getSelectedDateStrings = () => {
    const dateStrings = Object.keys(selectedDates);
    return dateStrings.filter(
      (dateString) => selectedDates[dateString].selected,
    );
  };

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
        <View>
          <View style={styles.rowItem}>
            <View style={styles.rowItemHeader}>
              <Text style={styles.rowItemHeaderText}>I'm free</Text>
              <Switch
                disabled={true}
                value={true}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#009846"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigate('ActivityDatePicker', {selectedDates})}
            style={styles.rowItem}>
            <View style={styles.rowItemContent}>
              <View>
                <Text style={styles.contentTitleText}>Choose dates</Text>
                <Text style={styles.contentSubtitleText}>
                  {getSelectedDateStrings().length} Dates selected
                </Text>
              </View>
              <Image
                style={styles.chevron}
                source={require('../../images/chevron-right.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('ActivityGroupPicker')}
            style={styles.rowItem}>
            <View style={styles.rowItemContent}>
              <View>
                <Text style={styles.contentTitleText}>Choose groups</Text>
                <Text style={styles.contentSubtitleText}>
                  O groups selected
                </Text>
              </View>
              <Image
                style={styles.chevron}
                source={require('../../images/chevron-right.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
  rowItem: {
    flexDirection: 'row',
  },
  rowItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 80,
    backgroundColor: '#01D060',
    paddingHorizontal: 30,
  },
  rowItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 100,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EBF0F3',
  },
  contentTitleText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: '900',
    marginBottom: 5,
  },
  rowItemHeaderText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontWeight: 'bold',
    color: 'white',
  },
  contentSubtitleText: {
    fontSize: 14,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: '#BCBCBC',
  },
  button: {
    height: 53,
    width: 250,
    backgroundColor: '#0066FF',
    color: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActivityAdder;
