const normalizePhoneNumber = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const currentValue = value.replace(/[^\d]/g, '');
  const currentValueLength = currentValue.length;
  if (!previousValue || value.length > previousValue.length) {
    if (currentValueLength < 1) {
      return '';
    }
    if (currentValueLength < 2) {
      return `+${currentValue.slice(0, 1)}`;
    }
    if (currentValueLength < 5) {
      return `+${currentValue.slice(0, 1)} ${currentValue.slice(1)}`;
    }
    if (currentValueLength < 8) {
      return `+${currentValue.slice(0, 1)} ${currentValue.slice(
        1,
        4,
      )}-${currentValue.slice(4, 7)}`;
    }
    return `+${currentValue.slice(0, 1)} ${currentValue.slice(
      1,
      4,
    )}-${currentValue.slice(4, 7)}-${currentValue.slice(7, 13)}`;
  }
};

export default normalizePhoneNumber;
