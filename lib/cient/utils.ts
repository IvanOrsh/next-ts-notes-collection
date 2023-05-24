const shortify = (text: string, maxLength = 80) => {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

export { shortify };
