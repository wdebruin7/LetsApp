import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {getGroupMembersString} from '../../utils';

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
          day.activities.filter(
            (activity) => activity.groupDocumentID === group.uid,
          ),
        )
        .flat(),
    );
  }, [activityDays, group.uid]);

  return (
    <SafeAreaView>
      <View>
        {group.photoRefURL ? <Avatar /> : null}
        <View>
          <Text>{group.name}</Text>
          <Text>{getGroupMembersString(group, userData)}</Text>
        </View>
      </View>
      <FlatList
        data={activities}
        renderItem={({item}) => <Text>{item.description}</Text>}
        keyExtractor={(item) => item.uid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default GroupInfo;
