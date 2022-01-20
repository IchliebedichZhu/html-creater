import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByData } from '@/utils';

const inputAttribute: AttributeFormList[] = [
  {
    key: 'text',
    type: 'input',
    label: 'label',
    value: '',
    extraData: {},
  },
  {
    key: 'placeholder',
    type: 'input',
    label: 'placeholder',
    value: '',
    extraData: {},
  },
];

const inputElement: (
  style: styleData[],
  attributes?: Record<string, any> | undefined
) => React.FunctionComponentElement<any> = (style, attributes) => (
  <div style={getStyleByData(style)}>
    <label>{attributes && attributes.text}</label>
    <input placeholder={attributes && attributes.placeholder}></input>
  </div>
);

export const inputData: DragMenuListData = {
  key: 'text',
  name: '文本',
  icon: 'text',
  style: [
    {
      key: 'width',
      value: '300px',
      type: 'input',
      title: '宽度',
    },
    {
      key: 'height',
      value: '30px',
      type: 'input',
      title: '高度',
    },
  ],
  attributes: inputAttribute,
  element: inputElement,
};
