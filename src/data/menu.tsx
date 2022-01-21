import { DragMenuListData } from '@/component/dragMenu';
import { TabListData, viewContainerId } from '@/component/dragView';
import { inputData } from './inputElem';
import { textData } from './textElem';
import { selectData } from './selector';

export const MENU_LIST: DragMenuListData[] = [inputData, textData, selectData];

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
