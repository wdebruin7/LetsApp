import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';

const GroupCreate = () => {
  const [groupName, setGroupName] = useState('');

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
      <Button title="Next" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create();

export default GroupCreate;
