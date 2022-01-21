import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByData, getStyleByKey } from '@/utils';

const textAttribute: AttributeFormList[] = [
  {
    key: 'text',
    type: 'input',
    label: '文本',
    value: 'text',
    extraData: {},
  },
];

const textElement: (
  style: styleData[],
  attributes?: Record<string, any> | undefined
) => React.FunctionComponentElement<any> = (style, attributes) => (
  <>
    <p style={getStyleByData(style)}>{attributes && attributes.text}</p>
  </>
);

export const textData: DragMenuListData = {
  key: 'text',
  name: '文本',
  icon: 'text',
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
  attributes: textAttribute,
  element: textElement,
};
