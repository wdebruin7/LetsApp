import storage from '@react-native-firebase/storage';

const getDownloadURL = async (storageRefURL) => {
  try {
    const ref = storage().refFromURL(storageRefURL);
    const url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default getDownloadURL;
