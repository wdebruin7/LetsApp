import storage from '@react-native-firebase/storage';

const getDownloadURL = async (storageRefPath) => {
  try {
    const ref = storage().ref(storageRefPath);
    const url = await ref.getDownloadURL();
    // console.log(url);
    return url;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default getDownloadURL;
