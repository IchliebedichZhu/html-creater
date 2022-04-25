import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByCustomStyle, getStyleByData, getStyleByKey } from '@/utils';
import { elementFunc } from './commonType';

const textAttribute: AttributeFormList[] = [
  {
    key: 'text',
    type: 'input',
    label: '文本',
    value: 'text',
    extraData: {},
  },
];

const textElement: elementFunc = (style, attributes, customStyle) => (
  <>
    <p
      style={Object.assign(
        getStyleByData(style),
        getStyleByCustomStyle(customStyle)
      )}
    >
      {attributes && attributes.text}
    </p>
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
    {
      key: 'fontSize',
      value: '#000',
      type: 'color',
      title: '字体颜色',
    },
  ],
  attributes: textAttribute,
  element: textElement,
};
