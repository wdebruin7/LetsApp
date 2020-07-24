import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  View,
} from 'react-native';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {Button} from '..';
import addReaction from '../../images/addReactionGrey.png';
import {addActivityReaction} from '../../firebase';
import {colors} from '../../constants';

const ReactionSelector = ({activityData, userData, style}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onEmojiSelected = (emoji) => {
    setModalVisible(false);
    addActivityReaction(emoji, activityData, userData).then((result) =>
      console.log(result),
    );
  };

  return (
    <TouchableOpacity style={style} onPress={() => setModalVisible(true)}>
      <View style={styles.imageBox}>
        <Image source={addReaction} style={styles.image} />
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <SafeAreaView style={styles.modal}>
            <Button title="cancel" onPress={() => setModalVisible(false)} />
            <EmojiSelector
              showSearchBar={true}
              showTabs={true}
              showHistory={true}
              showSectionTitles={false}
              category={Categories.all}
              onEmojiSelected={onEmojiSelected}
            />
          </SafeAreaView>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    resizeMode: 'contain',
    width: 30,
    height: 25,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 22,
    height: 22,
  },
  modal: {
    flex: 1,
  },
});

export default ReactionSelector;
