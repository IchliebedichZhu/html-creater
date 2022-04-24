import { Input } from 'antd';
import { useCallback } from 'react';
import { AttributeFormList } from '.';

type AttributeFormInputParam = {
  item: AttributeFormList;
  index: number;
  onChange?: (item: AttributeFormList, value: string, index: number) => void;
};

function AttributeFormInput({
  item,
  onChange = () => {},
  index,
}: AttributeFormInputParam) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(item, e.target.value, index);
    },
    [item, onChange, index]
  );
  return (
    <div className='common_attr'>
      <label className='common_attr_label'>{item.label}</label>
      <Input
        placeholder={item.extraData.placeholder}
        onChange={handleChange}
        value={item.value}
      />
    </div>
  );
}

export default AttributeFormInput;
