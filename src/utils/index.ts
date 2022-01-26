import { customStyleData } from '@/component/dragAttribute/attributeStyle';
import { styleData } from '@/component/dragMenu';
import React from 'react';

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

/** 样式列表转换成样式对象 */
export function getStyleByData(
  styleList: styleData[] = []
): React.CSSProperties {
  let cssObj: React.CSSProperties = {};

  styleList.forEach((val) => {
    (cssObj[val.key] as Record<string, any>) = val.value as any;
  });

  return cssObj;
}

/** 根据key获取style值 */
export function getStyleByKey(
  keys: (keyof React.CSSProperties)[],
  styleList: styleData[]
) {
  let obj: React.CSSProperties = {};
  keys.forEach((val) => {
    let index = styleList.findIndex((item) => item.key === val);
    if (index !== -1) {
      // @ts-ignore
      obj[val] = styleList[index].value;
    }
  });
  return obj;
}

/** 根据自定义样式列表获取style值 */
export function getStyleByCustomStyle(list: customStyleData[] = []) {
  const obj: Record<string, any> = {};

  list.forEach((val) => {
    obj[val.key] = val.value;
  });

  return obj;
}
