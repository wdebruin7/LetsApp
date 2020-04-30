import storage from '@react-native-firebase/storage';

const getDownloadURL = async (storageRefPath, setDownloadURL) => {
  try {
    const ref = storage().ref(storageRefPath);
    const url = await ref.getDownloadURL();
    if (setDownloadURL) setDownloadURL(url);
    return url;
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default getDownloadURL;
