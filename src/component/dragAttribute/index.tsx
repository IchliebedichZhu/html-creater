import { styleData } from '../dragMenu';
import AttributeForm, { AttributeFormList, changeFunc } from './attributeForm';
import AttributeStyle, { handleStyleChangeFunc } from './attributeStyle';
import './index.scss';

type DragAttributeParam = {
  title?: string;
  attributeList?: AttributeFormList[];
  handleChange?: changeFunc;
  handleStyleChange?: handleStyleChangeFunc;
  styleList?: styleData[];
};

function DragAttribute({
  title = 'Attributes',
  attributeList = [],
  styleList = [],
  handleStyleChange = () => {},
  handleChange,
}: DragAttributeParam) {
  return (
    <section className='drag_attributes'>
      <h3 className='drag_attributes_title'>{title}</h3>
      <AttributeForm list={attributeList} handleChange={handleChange} />
      <AttributeStyle styleList={styleList} handleChange={handleStyleChange} />
    </section>
  );
}

export default DragAttribute;
