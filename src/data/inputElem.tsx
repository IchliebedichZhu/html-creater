import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { customStyleData } from '@/component/dragAttribute/attributeStyle';
import { DragMenuListData, styleData } from '@/component/dragMenu';
import { getStyleByData, getStyleByKey, getStyleByCustomStyle } from '@/utils';
import { elementFunc } from './commonType';

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

const inputElement: elementFunc = (style, attributes, customStyle) => (
  <>
    <label style={getStyleByKey(['fontSize'], style)}>
      {attributes && attributes.text}
    </label>
    <input
      placeholder={attributes && attributes.placeholder}
      style={Object.assign(
        getStyleByData(style),
        getStyleByCustomStyle(customStyle)
      )}
    ></input>
  </>
);

export const inputData: DragMenuListData = {
  key: 'input',
  name: '输入框',
  icon: 'input',
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
  ],
  attributes: inputAttribute,
  element: inputElement,
};
