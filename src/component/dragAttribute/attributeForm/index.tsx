import { Input } from 'antd';
import './index.scss';

type TypeKey = 'input';

type changeFunc = (item: AttributeFormList, value: string) => void;

export type AttributeFormList = {
  key: string;
  type: TypeKey;
  label: string;
  extraData: Record<string, any>;
  handleChange?: changeFunc;
};

type AttributeFormParam = {
  list: AttributeFormList[];
};

type HandleComponentParam = {
  item: AttributeFormList;
  handleChange?: changeFunc;
};

function HandleComponent({
  item,
  handleChange = () => {},
}: HandleComponentParam) {
  switch (item.type) {
    case 'input':
      return (
        <div className='common_attr'>
          <label className='common_attr_label'>{item.label}</label>
          <Input
            placeholder={item.extraData.placeholder}
            onChange={(e) => handleChange(item, e.target.value)}
          />
        </div>
      );

    default:
      return null;
  }
}

function AttributeForm({ list }: AttributeFormParam) {
  return (
    <div className='attr_form_main'>
      {list.map((val) => (
        <HandleComponent item={val} />
      ))}
    </div>
  );
}

export default AttributeForm;
