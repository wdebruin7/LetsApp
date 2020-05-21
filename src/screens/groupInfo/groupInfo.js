import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import {
  getDisplayDate,
  getActivityParticipantsString,
  buildDynamicLink,
  getGroupMembersString,
} from '../../utils';
import {
  AddActivityButton,
  TileHeader,
  TileBody,
  GroupInfoTile,
} from '../../components';

const GroupInfo = () => {
  const {params} = useRoute();
  const userData = useSelector((state) => state.user.data || {});
  const groups = useSelector((state) => state.groups || {});
  const activityDays = useSelector((state) => state.activities || []);

  const group = params.group || groups[params.groupUID] || {};
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setActivities(
      activityDays
        .map((day) =>
          day.activities.filter((activity) => activity.group.uid === group.uid),
        )
        .flat(),
    );
  }, [activityDays, group.uid]);

  const onPressCopy = async () => {
    const searchParams = {
      type: 'group',
      id: group.uid,
    };

    buildDynamicLink(searchParams, true)
      .then((link) => Clipboard.setString(link))
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View>
        <View>
          {group.photoRefURL ? <Avatar /> : null}
          <TouchableOpacity>
            <View>
              <Text>{group.name}</Text>
              <Text>{getGroupMembersString(group, userData)}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Icon name="person-add" type="material-icons" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCopy}>
            <Icon name="link" type="material-icons" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={activities}
        renderItem={({item}) => (
          <GroupInfoTile activity={item} userData={userData} />
        )}
        keyExtractor={(item) => item.uid}
        style={styles.list}
      />
      <AddActivityButton groupUID={group.uid} />
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
});

export default GroupInfo;
