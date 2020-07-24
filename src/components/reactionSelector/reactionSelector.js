import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
} from 'react-native';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {Button} from '..';
import addReaction from '../../images/addReaction.png';
import {addActivityReaction} from '../../firebase';

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  modal: {
    flex: 1,
  },
});

export default ReactionSelector;
