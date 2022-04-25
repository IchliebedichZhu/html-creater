import { styleData } from '@/component/dragMenu';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Input, Upload } from 'antd';
import AttributeFormInput from './formInput';
import AttributeFormUpload from './formUpload';
import './index.scss';

type TypeKey = 'input' | 'image' | 'range';

export type changeFunc = (
  item: AttributeFormList,
  value: any,
  index: number
) => void;

export type AttributeFormList = {
  key: string;
  type: TypeKey;
  label: string;
  extraData: Record<string, any>;
  value: any;
};

type AttributeFormParam = {
  list: AttributeFormList[];
  handleChange?: changeFunc;
};

type HandleComponentParam = {
  item: AttributeFormList;
  index: number;
  handleChange?: changeFunc;
};

/** 表单组件 */
function HandleComponent({
  item,
  index,
  handleChange = () => {},
}: HandleComponentParam) {
  switch (item.type) {
    case 'input':
      return (
        <AttributeFormInput item={item} index={index} onChange={handleChange} />
      );
    case 'image':
      return (
        <AttributeFormUpload
          item={item}
          index={index}
          onChange={handleChange}
        />
      );
    default:
      return null;
  }
}

function AttributeForm({ list, handleChange }: AttributeFormParam) {
  return (
    <div className='attr_form_main'>
      {list.map((val, index) => (
        <HandleComponent
          item={val}
          key={val.key}
          handleChange={handleChange}
          index={index}
        />
      ))}
    </div>
  );
}

export default AttributeForm;
