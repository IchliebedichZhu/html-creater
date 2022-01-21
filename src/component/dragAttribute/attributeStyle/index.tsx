import { styleData } from '@/component/dragMenu';
import { Card, Input } from 'antd';
import React, { ReactElement } from 'react';
import './index.scss';

export type handleStyleChangeFunc = (
  item: styleData,
  value: string | number,
  index: number
) => void;

type StyleComponent = {
  data: styleData;
  index: number;
  handleChange: handleStyleChangeFunc;
};

type AttributeStyleParam = {
  styleList: styleData[];
  handleChange?: handleStyleChangeFunc;
};

function CommonStyleComponent(
  Children: React.ReactNode,
  title: string
): ReactElement {
  return (
    <div className='common_attr'>
      <label className='common_attr_label'>{title}</label>
      {Children}
    </div>
  );
}

/** 样式组件 */
function StyleComponent({ data, index, handleChange }: StyleComponent) {
  switch (data.type) {
    case 'input':
      return CommonStyleComponent(
        <Input
          placeholder={data.title}
          onChange={(e) => handleChange(data, e.target.value, index)}
          value={data.value}
        />,
        data.title
      );
    case 'color':
      return CommonStyleComponent(
        <Input
          type='color'
          value={data.value}
          onChange={(e) => handleChange(data, e.target.value, index)}
        />,
        data.title
      );
    default:
      return null;
  }
}

function AttributeForm({
  styleList,
  handleChange = () => {},
}: AttributeStyleParam) {
  return (
    <div className='attr_form_main'>
      {styleList.map((val, index) => (
        <StyleComponent
          data={val}
          index={index}
          handleChange={handleChange}
          key={val.key + '_' + index}
        />
      ))}
    </div>
  );
}

export default AttributeForm;
