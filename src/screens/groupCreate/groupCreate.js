import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import {TextBox} from '../../components';

const GroupCreate = () => {
  const [groupName, setGroupName] = useState('');
  const userData = useSelector((state) => state.user.data || {});

  const onPressNext = async () => {
    const rv = await createGroup(groupName, undefined, userData);
    console.log(rv);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.header}>
        <Text style={styles.logo}>Let's</Text>
        <Text style={styles.subtitle}>Create a group</Text>
      </View>
      <View>
        <View>
          <Text style={styles.inputTitle}>Group name</Text>
          <TextBox
            style={styles.nameInput}
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

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 15,
  },
  safeView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    fontFamily: 'Trebuchet MS',
    paddingBottom: 10,
    fontSize: 58,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: '#8D8D8D',
  },
  nameInput: {
    width: 220,
  },
  inputTitle: {
    paddingLeft: 15,
    paddingTop: 20,
  },
});

export default GroupCreate;
