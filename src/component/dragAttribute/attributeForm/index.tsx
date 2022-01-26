import { styleData } from '@/component/dragMenu';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Input, Upload } from 'antd';
import './index.scss';

type TypeKey = 'input' | 'image';

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
        <div className='common_attr'>
          <label className='common_attr_label'>{item.label}</label>
          <Input
            placeholder={item.extraData.placeholder}
            onChange={(e) => handleChange(item, e.target.value, index)}
            value={item.value}
          />
        </div>
      );
    case 'image':
      return (
        <div className='common_attr'>
          <label className='common_attr_label'>{item.label}</label>
          <Upload
            onChange={(e) =>
              handleChange(item, e.file.originFileObj || '', index)
            }
            action=''
          >
            {!item.value ? (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            ) : (
              <Image src={item.value} preview={false} />
            )}
          </Upload>
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
