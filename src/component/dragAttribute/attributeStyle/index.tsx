import { styleData } from '@/component/dragMenu';
import { Input } from 'antd';
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

/** 样式组件 */
function StyleComponent({ data, index, handleChange }: StyleComponent) {
  switch (data.type) {
    case 'input':
      return (
        <div className='common_attr'>
          <label className='common_attr_label'>{data.title}</label>
          <Input
            placeholder={data.title}
            onChange={(e) => handleChange(data, e.target.value, index)}
            value={data.value}
          />
        </div>
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
        <StyleComponent data={val} index={index} handleChange={handleChange} />
      ))}
    </div>
  );
}

export default AttributeForm;
