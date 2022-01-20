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
