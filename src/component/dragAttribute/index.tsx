import { Collapse } from 'antd';
import { useState } from 'react';
import { styleData } from '../dragMenu';
import AttributeForm, { AttributeFormList, changeFunc } from './attributeForm';
import AttributeStyle, {
  customStyleChangeFunc,
  customStyleData,
  handleStyleChangeFunc,
} from './attributeStyle';
import './index.scss';

const { Panel } = Collapse;

type DragAttributeParam = {
  title?: string;
  attributeList?: AttributeFormList[];
  handleChange?: changeFunc;
  handleStyleChange?: handleStyleChangeFunc;
  customStyleChange?: customStyleChangeFunc;
  styleList?: styleData[];
  customStyle?: customStyleData[];
};

/** 渲染主函数 */
function DragAttribute({
  attributeList = [],
  styleList = [],
  handleStyleChange = () => {},
  customStyleChange = () => {},
  handleChange,
  customStyle = [],
}: DragAttributeParam) {
  const [currentIndex, setCurrentIndex] = useState<string | string[]>(
    'attribute'
  );
  return (
    <section className='drag_attributes'>
      <Collapse
        defaultActiveKey={currentIndex}
        ghost
        onChange={(key) => {
          setCurrentIndex(key);
        }}
      >
        <Panel header='属性' key='attribute'>
          <AttributeForm list={attributeList} handleChange={handleChange} />
        </Panel>
        <Panel header='样式' key='style'>
          <AttributeStyle
            styleList={styleList}
            customList={customStyle}
            handleChange={handleStyleChange}
            customStyleChange={customStyleChange}
          />
        </Panel>
      </Collapse>
    </section>
  );
}

export default DragAttribute;
