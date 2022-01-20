import { styleData } from '@/component/dragMenu';
import { Input } from 'antd';
import './index.scss';

type TypeKey = 'input';

export type changeFunc = (
  item: AttributeFormList,
  value: string,
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
        <div className='common_attr'>
          <label className='common_attr_label'>{item.label}</label>
          <Input
            placeholder={item.extraData.placeholder}
            onChange={(e) => handleChange(item, e.target.value, index)}
            value={item.value}
          />
        </div>
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
