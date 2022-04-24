import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { useCallback } from 'react';
import { AttributeFormList } from '.';

type AttributeUploadParam = {
  item: AttributeFormList;
  index: number;
  onChange?: (
    item: AttributeFormList,
    file: RcFile | undefined,
    index: number
  ) => void;
};

/** 图片上传 */
function AttributeFormUpload({
  item,
  index,
  onChange = () => {},
}: AttributeUploadParam) {
  const handleChange = useCallback(
    (e: UploadChangeParam<UploadFile<any>>) => {
      onChange(item, e.file.originFileObj, index);
    },
    [item, index, onChange]
  );
  return (
    <div className='common_attr'>
      <label className='common_attr_label'>{item.label}</label>
      <Upload onChange={handleChange} action=''>
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
}

export default AttributeFormUpload;
