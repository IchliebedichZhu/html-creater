import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByCustomStyle, getStyleByData, getStyleByKey } from '@/utils';
import { elementFunc } from './commonType';

const selectAttribute: AttributeFormList[] = [
  {
    key: 'text',
    type: 'input',
    label: '文本',
    value: 'text',
    extraData: {},
  },
];

const selectElement: elementFunc = (style, attributes, customStyle) => (
  <>
    <select
      style={Object.assign(
        getStyleByData(style),
        getStyleByCustomStyle(customStyle)
      )}
    >
      <option></option>
    </select>
  </>
);

export const selectData: DragMenuListData = {
  key: 'select',
  name: '选择框',
  icon: 'select',
  style: [
    {
      key: 'width',
      value: '200px',
      type: 'input',
      title: '宽度',
    },
    {
      key: 'height',
      value: '30px',
      type: 'input',
      title: '高度',
    },
    {
      key: 'background',
      value: '#fff',
      type: 'color',
      title: '背景色',
    },
  ],
  attributes: selectAttribute,
  element: selectElement,
};
