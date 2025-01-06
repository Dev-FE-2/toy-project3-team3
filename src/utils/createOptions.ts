// vaule,label쌍 객체 생성 함수
const createOptions = <T extends Record<string, string>>(obj: T) =>
  Object.entries(obj).map(([value, label]) => ({ value, label }));

export default createOptions;
