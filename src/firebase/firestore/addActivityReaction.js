import firestore from '@react-native-firebase/firestore';
import emojiRegex from 'emoji-regex';

const addActivityReaction = (emoji, activityData, userData) => {
  const regex = emojiRegex();
  const db = firestore();

  if (!emoji) {
    return new Promise((resolve, reject) =>
      reject(new Error('no emoji provided')),
    );
  }

  const matchedEmoji = regex.exec(emoji);

  if (matchedEmoji.length !== 1) {
    return new Promise((resolve, reject) =>
      reject(new Error('invalid emoji provided')),
    );
  }

  if (!activityData) {
    return new Promise((resolve, reject) =>
      reject(new Error('invalid activity')),
    );
  }

  if (!userData) {
    return new Promise((resolve, reject) =>
      reject(new Error('invalid user object')),
    );
  }

  const activityRef = db.collection('activities').doc(activityRef.uid);

  return db.runTransaction((transaction) => {
    transaction.get(activityRef).then((docSnapshot) => {
      const data = docSnapshot.data();

      const {count, users} = data.reactions[emoji] || {};

      const newCount = count ? count + 1 : 1;
      const newUsers = users || {};
      newUsers[userData.uid] = {
        name: userData.name,
        uid: userData.uid,
        timeStamp: firestore.Timestamp.now(),
      };

      const update = {};
      update[`reactions.${emoji}`] = {count: newCount, users: newUsers};

      transaction.update(activityRef, update);
    });
  });
};

export default addActivityReaction;
