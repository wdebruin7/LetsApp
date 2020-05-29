import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

const buildDynamicLink = async (searchParams, short) => {
  console.log(searchParams);

  const url = new URL('https://getlets.app');
  Object.keys(searchParams).forEach((key) => {
    console.log(key);
    console.log(searchParams[key]);
    url.searchParams.set(key, searchParams[key]);
  });

  console.log('heree');

  console.log(url.toString());

  const dynamicLinkParams = {
    link: url,
    domainUriPrefix: 'https://getlets.app/link',
  };

  if (short) {
    return dynamicLinks().buildShortLink(
      dynamicLinkParams,
      FirebaseDynamicLinksTypes.ShortLinkType.SHORT,
    );
  } else {
    return dynamicLinks().buildLink(dynamicLinkParams);
  }
};

export default buildDynamicLink;
