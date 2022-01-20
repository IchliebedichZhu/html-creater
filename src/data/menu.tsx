import { DragMenuListData } from '@/component/dragMenu';
import { TabListData, viewContainerId } from '@/component/dragView';
import { inputData } from './inputElem';

export const MENU_LIST: DragMenuListData[] = [
  // {
  //   key: 'form',
  //   name: '表单',
  //   icon: 'form',
  //   style: [],
  //   element: (style) => <div style={style}>form</div>,
  // },
  // {
  //   key: 'box',
  //   name: '盒子',
  //   icon: 'box',
  //   style: [],
  //   element: (style) => <div style={style}>box</div>,
  // },
  inputData,
];

/** 视图层菜单 */
export const VIEW_MENU_TAB_LIST: TabListData[] = [
  {
    key: viewContainerId,
    name: '视图',
  },
  {
    key: 'code',
    name: '代码',
  },
];
