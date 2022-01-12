import { DragMenuListData } from '@/component/dragMenu';
import ReactDOM from 'react-dom';

export const MOVE_CHILD_ID = 'move_child';

let tmpNode: HTMLDivElement | undefined;

/** 定义一个临时箱子，用户装载拖动模块 */
export function InitTempBox() {
  const tmpChild = document.createElement('div');
  tmpChild.id = MOVE_CHILD_ID;
  tmpChild.style.position = 'fixed';
  tmpChild.style.top = '0';
  tmpChild.style.left = '0';
  tmpChild.style.display = 'none';
  document.body.appendChild(tmpChild);
}

// 菜单点击事件
export function handleMenuClick(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item?: DragMenuListData
) {
  const node = document.querySelector<HTMLDivElement>(`#${MOVE_CHILD_ID}`);
  if (node && item) {
    tmpNode = node;
    node.style.display = 'block';

    node.style.transform = `translate3d(${e.pageX}px, ${e.pageY}px, 0)`;
    ReactDOM.render(item.element(item.style || {}), node);
  }
}

export function handleMouseMove(e: MouseEvent) {
  if (tmpNode) {
    let pageX = e.pageX,
      pageY = e.pageY;

    tmpNode.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
  }
}

// 鼠标松开事件
export function handleMouseUp(e: MouseEvent, containerId: string) {
  const container = document.querySelector<HTMLDivElement>(`#${containerId}`);
  let isInsert = false;
  if (tmpNode && container) {
    const { clientWidth, clientHeight } = container;
    const boundingClientRect = container.getBoundingClientRect();
    const { top: offsetTop, left: offsetLeft } = boundingClientRect;
    const { pageX, pageY } = e;
    const containerMaxWidth = offsetLeft + clientWidth;
    const containerMaxHeight = offsetTop + clientHeight;

    if (
      pageX > offsetLeft &&
      pageX < containerMaxWidth &&
      pageY > offsetTop &&
      pageY < containerMaxHeight
    ) {
      isInsert = true;
    }

    ReactDOM.unmountComponentAtNode(tmpNode);
    tmpNode = undefined;
    return isInsert;
  }
}
