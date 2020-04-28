const validatePhoneNumber = (value) => {
  let error = '';
  if (!value) {
    error = 'Required!';
  } else if (value.length !== 15) {
    error = 'Invalid Format';
  }
  return error;
};

export default validatePhoneNumber;
