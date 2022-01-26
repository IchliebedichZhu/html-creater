import { styleData } from '@/component/dragMenu';
import { Button, Card, Input } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

export type handleStyleChangeFunc = (
  item: styleData,
  value: string | number,
  index: number
) => void;

export type customStyleChangeFunc = (item: customStyleData[]) => void;

export type customStyleData = {
  key: string;
  value: string;
};

type StyleComponent = {
  data: styleData;
  index: number;
  handleChange: handleStyleChangeFunc;
};

type AttributeStyleParam = {
  styleList: styleData[];
  customList: customStyleData[];
  handleChange?: handleStyleChangeFunc;
  customStyleChange?: customStyleChangeFunc;
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

/** 自定义样式 */
function CustomStyle({
  customStyle = [],
  handleChange = () => {},
}: {
  customStyle: customStyleData[];
  handleChange?: customStyleChangeFunc;
}) {
  const [customList, setCustomList] = useState<customStyleData[]>(customStyle);
  useEffect(() => {
    setCustomList(customStyle);
  }, [customStyle]);
  return (
    <>
      {customList.map((val, index) => (
        <div className='custom_style' key={`custom_style_${index}`}>
          <Input
            className='custom_style_key'
            placeholder='样式名'
            value={val.key}
            onChange={(e) => {
              val.key = e.target.value;
              setCustomList([...customList]);
              handleChange(customList);
            }}
          />
          <Input
            className='custom_style_value'
            placeholder='样式值'
            value={val.value}
            onChange={(e) => {
              val.value = e.target.value;
              setCustomList([...customList]);
              handleChange(customList);
            }}
          />
        </div>
      ))}
      <Button
        className='custom_style_add_btn'
        type='primary'
        onClick={() => {
          customList.push({ key: '', value: '' });
          setCustomList([...customList]);
          handleChange(customList);
        }}
      >
        <PlusOutlined style={{ color: '#fff' }} />
      </Button>
    </>
  );
}

function AttributeForm({
  styleList,
  customList,
  handleChange = () => {},
  customStyleChange = () => {},
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
      <CustomStyle customStyle={customList} handleChange={customStyleChange} />
    </div>
  );
}

export default AttributeForm;
