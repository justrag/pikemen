const range = (start, end) =>
  [...Array(end - start + 1).keys()].map(i => i + start);
export default range;
