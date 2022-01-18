/** 深拷贝 */
export function deepClone<T extends Record<string, any>>(obj: T): T {
  let newObj: any = Array.isArray(obj) ? [] : {};
  for (let x in obj) {
    if (Object.prototype.toString.call(obj[x]) === '[object Object]') {
      newObj[x] = deepClone(obj[x]);
    } else if (Array.isArray(obj[x])) {
      newObj[x] = deepClone(obj[x]);
    } else {
      newObj[x] = obj[x];
    }
  }
  return newObj;
}
