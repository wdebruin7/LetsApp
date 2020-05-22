import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import {useSelector} from 'react-redux';
import {createGroup} from '../../firebase';

const GroupCreate = () => {
  const [groupName, setGroupName] = useState('');
  const userData = useSelector((state) => state.user.data || {});

  const onPressNext = async () => {
    const rv = await createGroup(groupName, undefined, userData);
    console.log(rv);
  };

  return (
    <SafeAreaView>
      <Text>Let&apos;s</Text>
      <Text>Create a group</Text>
      <View>
        <View>
          <Text>Group name</Text>
          <TextInput
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Choose a name for your group"
          />
        </View>
      </View>
      <Button title="Next" onPress={onPressNext} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create();

export default GroupCreate;
