import dynamicLinks from '@react-native-firebase/dynamic-links';

const buildDynamicLink = async (searchParams, short) => {
  const url = `https://getlets.app/?value=${searchParams.value}&id=${searchParams.id}`;

  const dynamicLinkParams = {
    link: url,
    domainUriPrefix: 'https://getlets.app/link',
  };

  if (short) {
    return dynamicLinks().buildShortLink(
      dynamicLinkParams,
      dynamicLinks.ShortLinkType.SHORT,
    );
  } else {
    return dynamicLinks().buildLink(dynamicLinkParams);
  }
};

export default buildDynamicLink;
