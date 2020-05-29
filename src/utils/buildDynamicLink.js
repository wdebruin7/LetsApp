import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';

const buildDynamicLink = async (searchParams, short) => {
  const url = new URL('https://getlets.app');
  Object.keys(searchParams).forEach((key) => {
    url.searchParams.set(key, searchParams[key]);
  });

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
