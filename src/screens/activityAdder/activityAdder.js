import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {cloneDeep} from 'lodash';
import {submitNewActivity} from '../../firebase';
import {Button} from '../../components';

const getDateTimeString = (date) => {
  return `${date.getYear()}-${date.getMonth()}-${date.getDate()}`;
};

const ActivityAdder = () => {
  const navigation = useNavigation();
  const params = useRoute().params || {};
  const userGroups = useSelector((state) => state.groups || {});
  const {dateTime, groupUID} = params;
  const markedDates = {...params.markedDates};
  const groups = params.groups || cloneDeep(userGroups);
  const [canSave, setCanSave] = useState(false);
  const [userIsParticipant, setUserIsParticipant] = useState(false);
  const userData = useSelector((state) => state.user.data || {});

  useEffect(() => {
    setCanSave(
      getSelectedDateStrings().length > 0 && getSelectedGroupUIDs().length > 0,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markedDates, groups]);

  if (groupUID) {
    groups[groupUID].selected = true;
  }
  if (dateTime) {
    markedDates[getDateTimeString(new Date(dateTime))] = {selected: true};
  }

  const getSelectedDateStrings = () => {
    const dateStrings = Object.keys(markedDates);
    return dateStrings.filter((dateString) => markedDates[dateString].selected);
  };

  const getSelectedGroupUIDs = () => {
    const groupUIDs = Object.keys(groups);
    return groupUIDs.filter((uid) => groups[uid].selected);
  };

  const getSelectedGroups = () => {
    return Object.values(groups).filter((group) => group.selected);
  };

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    submitNewActivity(
      getSelectedGroups(),
      getSelectedDateStrings(),
      userIsParticipant,
      userData,
      undefined,
    ).then(() => navigation.goBack());
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onChangeSwitch = () => setUserIsParticipant(!userIsParticipant);

  const onPressChooseDates = () => {
    navigation.navigate('ActivityDatePicker', {
      selectedDates: markedDates,
    });
  };

  const onPressChooseGroups = () => {
    navigation.navigate('ActivityGroupPicker', {groups});
  };

  const getDatesSubtitle = () => {
    const numSelectedDates = getSelectedDateStrings().length;
    const s = numSelectedDates === 1 ? '' : 's';
    return `${numSelectedDates} Date${s} selected`;
  };

  const getGroupsSubtitle = () => {
    const numSelectedGroups = getSelectedGroupUIDs().length;
    const s = numSelectedGroups === 1 ? '' : 's';
    return `${numSelectedGroups} Group${s} selected`;
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={onPressBack}>
            <View style={styles.backButton}>
              <Icon name="chevron-left" type="entypo" />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.headerText}>Let&apos;s go!</Text>
          <Text>When are you free?</Text>
        </View>
        <View style={styles.rowItem}>
          <View style={styles.rowItemHeader}>
            <Text style={styles.rowItemHeaderText}>I&apos;m free</Text>
            <Switch
              value={userIsParticipant}
              onValueChange={onChangeSwitch}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#009846"
            />
          </View>
        </View>
        <TouchableOpacity onPress={onPressChooseDates} style={styles.rowItem}>
          <View style={styles.rowItemContent}>
            <View>
              <Text style={styles.contentTitleText}>Choose dates</Text>
              <Text style={styles.contentSubtitleText}>
                {getDatesSubtitle()}
              </Text>
            </View>
            <Icon name="chevron-right" type="entypo" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressChooseGroups} style={styles.rowItem}>
          <View style={styles.rowItemContent}>
            <View>
              <Text style={styles.contentTitleText}>Choose groups</Text>
              <Text style={styles.contentSubtitleText}>
                {getGroupsSubtitle()}
              </Text>
            </View>
            <Icon name="chevron-right" type="entypo" />
          </View>
        </TouchableOpacity>
        <Button
          onPress={handleSave}
          title="Save"
          disabled={!canSave}
          style={styles.button}
          raised
        />
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
    width: 250,
  },
});

export default ActivityAdder;
