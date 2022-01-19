import { DragMenuListData } from '@/component/dragMenu';
import { TabListData, viewContainerId } from '@/component/dragView';

export const MENU_LIST: DragMenuListData[] = [
  {
    key: 'form',
    name: '表单',
    icon: 'form',
    style: {
      background: '#fff',
      width: 300,
      height: 150,
    },
    element: (style) => <div style={style}>form</div>,
  },
  {
    key: 'box',
    name: '盒子',
    icon: 'box',
    style: {
      background: '#fff',
      width: 300,
      height: 150,
    },
    element: (style) => <div style={style}>box</div>,
  },
  {
    key: 'text',
    name: '文本',
    icon: 'text',
    style: {
      width: 300,
      height: 30,
    },
    attributes: [
      {
        key: 'text',
        type: 'input',
        label: '文本',
        value: '文本',
        extraData: {},
      },
    ],
    element: (style, attributes) => (
      <div style={style}>
        <label>{attributes && attributes.text}</label>
        <input></input>
      </div>
    ),
  },
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
