import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import Clipboard from '@react-native-community/clipboard';
import {getGroupMembersString, buildDynamicLink} from '../../utils';
import {AddActivityButton} from '../../components';

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
    <SafeAreaView>
      <View>
        <View>
          {group.photoRefURL ? <Avatar /> : null}
          <View>
            <Text>{group.name}</Text>
            <Text>{getGroupMembersString(group, userData)}</Text>
          </View>
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
        renderItem={({item}) => <Text>{item.description}</Text>}
        keyExtractor={(item) => item.uid}
      />
      <AddActivityButton groupUID={group.uid} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default GroupInfo;
