import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByData, getStyleByKey } from '@/utils';

const selectAttribute: AttributeFormList[] = [
  {
    key: 'text',
    type: 'input',
    label: '文本',
    value: 'text',
    extraData: {},
  },
];

const selectElement: (
  style: styleData[],
  attributes?: Record<string, any> | undefined
) => React.FunctionComponentElement<any> = (style, attributes) => (
  <>
    <select style={getStyleByData(style)}>
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
