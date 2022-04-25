import { DragMenuListData, DragMenuPanelData } from '@/component/dragMenu';
import { TabListData, viewContainerId } from '@/component/dragView';
import { inputData } from './inputElem';
import { textData } from './textElem';
import { selectData } from './selector';
import { imageData } from './imageElem';

export const MENU_LIST: DragMenuPanelData[] = [
  {
    key: 'common_menu',
    title: '基础组件',
    list: [textData, imageData],
  },
  {
    key: 'form_menu',
    title: '表单',
    list: [inputData, selectData],
  },
];

/** 视图层菜单 */
export const VIEW_MENU_TAB_LIST: TabListData[] = [
  {
    key: viewContainerId,
    name: '设计',
  },
  {
    key: 'preview',
    name: '预览',
  },
  {
    key: 'code',
    name: '代码',
  },
];
