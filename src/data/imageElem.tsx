import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { customStyleData } from '@/component/dragAttribute/attributeStyle';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByData, getStyleByKey, getStyleByCustomStyle } from '@/utils';
import { elementFunc } from './commonType';

const imageAttribute: AttributeFormList[] = [
  {
    key: 'src',
    type: 'image',
    label: 'image',
    value: 'https://img.yzmblog.top/01.jpeg',
    extraData: {},
  },
];

const imageElement: elementFunc = (style, attributes, customStyle) => (
  <img
    src={attributes && attributes.src}
    style={Object.assign(
      getStyleByData(style),
      getStyleByCustomStyle(customStyle)
    )}
  />
);

export const imageData: DragMenuListData = {
  key: 'image',
  name: '图片',
  icon: 'image',
  style: [
    {
      key: 'width',
      value: '100%',
      type: 'input',
      title: '宽度',
    },
    {
      key: 'height',
      value: '200px',
      type: 'input',
      title: '高度',
    },
  ],
  attributes: imageAttribute,
  element: imageElement,
};
