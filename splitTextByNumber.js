const splitStringByNumber = (str = '') => {
  const arr = [];
  if (typeof str !== 'string') return arr;
  const trimStr = str.trim();
  if (trimStr.length === 0) return arr;
  const strArr = trimStr.split('');
  const len = strArr.length;
  let tag = '';
  let number = '';
  strArr.forEach((it, _idx) => {
    if (Number.isInteger(+it)) {
      tag !== '' && arr.push(tag);
      number += it;
      !Number.isInteger(+strArr[_idx + 1]) && (arr.push(+number), (number = ''));
      tag = '';
    } else {
      tag += it;
      _idx === len - 1 && arr.push(tag);
    }
  });
  return arr;
};

export default splitStringByNumber;