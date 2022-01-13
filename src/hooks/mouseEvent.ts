/** 全局鼠标移动事件 */
export function useMouseMove(callback: (e: MouseEvent) => void) {
  document.addEventListener('mousemove', (e) => {
    e.preventDefault();
    callback(e);
  });
}

/** 删除全局鼠标移动事件 */
export function useRemoveMouseMove(callback: (e: MouseEvent) => void) {
  document.removeEventListener('mousemove', callback);
  return true;
}

/** 全局鼠标松开事件 */
export function useMouseUp(callback: (e: MouseEvent) => void) {
  document.addEventListener('mouseup', (e) => {
    e.preventDefault();
    callback(e);
  });
}

/** 删除全局鼠标松开事件 */
export function useRemoveMouseUp(callback: (e: MouseEvent) => void) {
  document.removeEventListener('mouseup', callback);
}
