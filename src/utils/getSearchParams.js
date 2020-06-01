const getSearchParams = (url) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match = regex.exec(url);
  while (match) {
    const key = match[1];
    const val = match[2];
    params[key] = val;
    match = regex.exec(url);
  }

  return params;
};

export default getSearchParams;
