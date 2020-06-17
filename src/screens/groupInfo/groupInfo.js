import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import storage from '@react-native-firebase/storage';
import {
  buildDynamicLink,
  getGroupMembersString,
  getActivityDays,
} from '../../utils';
import {GroupInfoTile, AppHeader} from '../../components';
import {colors} from '../../constants';

const GroupInfo = () => {
  const {params} = useRoute();
  const userData = useSelector((state) => state.user.data);
  const groups = useSelector((state) => state.groups);
  const allActivities = useSelector((state) => state.activities);
  const [photoRefURL, setPhotoRefURL] = useState('');
  const {navigate} = useNavigation();

  const group = params.group || groups[params.groupUID];
  const [activities, setActivities] = useState([]);
  const emptyStateImage = require('../../images/groupEmptyState.png');

  useEffect(() => {
    if (!group) {
      navigate('GroupsHome', {groupUID: params.groupUID});
    }
  }, [params, group, navigate]);

  useEffect(() => {
    if (group && group.thumbnailImagePath) {
      const ref = storage().ref(`${group.uid}/thumbnail`);
      ref.getDownloadURL().then((url) => setPhotoRefURL(url));
    }
  }, [group]);

  useEffect(() => {
    if (!group || !allActivities) return;
    setActivities(
      getActivityDays(allActivities)
        .map((day) =>
          day.activities.filter((activity) => activity.group.uid === group.uid),
        )
        .flat(),
    );
  }, [allActivities, group]);

  const onPressCopy = async () => {
    const searchParams = {
      type: 'group',
      id: group.uid,
    };

    buildDynamicLink(searchParams, true)
      .then((link) => Clipboard.setString(link))
      .catch((error) => console.log(error));
  };

  if (!group) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <AppHeader />
      <View style={styles.header}>
        <View style={styles.groupInfo}>
          <View style={styles.groupPhoto}>
            {photoRefURL ? (
              <Image style={styles.groupPhoto} source={{uri: photoRefURL}} />
            ) : (
              <Icon name="group" type="material-icons" size={30} />
            )}
          </View>
          <TouchableOpacity>
            <View style={styles.groupDetails}>
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupMembers}>
                {getGroupMembersString(group, userData)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.link}>
          <View>
            <TouchableOpacity onPress={onPressCopy}>
              <Icon
                name="link"
                type="material-icons"
                color="#A6A6A6"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {activities.length === 0 && (
        <Image style={styles.emptyStateImage} source={emptyStateImage} />
      )}
      <FlatList
        data={activities}
        renderItem={({item}) => (
          <GroupInfoTile activity={item} userData={userData} />
        )}
        keyExtractor={(item) => item.uid}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#FCFEFF',
    flex: 1,
  },
  list: {
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    height: 140,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 20,
  },
  groupPhoto: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  groupMembers: {
    color: '#8D8D8D',
    fontSize: 13,
    paddingTop: 6,
    width: 200,
  },
  link: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 40,
    paddingBottom: 10,
  },
  groupDetails: {
    marginLeft: 15,
  },
  emptyStateImage: {
    width: 278,
    height: 129,
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: 5,
  },
});

export default GroupInfo;
