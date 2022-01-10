import AttributeForm, { AttributeFormList } from './attributeForm';
import './index.scss';

type DragAttribute = {
  title?: string;
  attributeList?: string[];
};

const list: AttributeFormList[] = [
  {
    key: 'test',
    label: 'test',
    type: 'input',
    extraData: {},
  },
];

function DragAttribute({
  title = 'Attributes',
  attributeList = [],
}: DragAttribute) {
  return (
    <section className='drag_attributes'>
      <h3 className='drag_attributes_title'>{title}</h3>
      <AttributeForm list={list} />
    </section>
  );
}

export default DragAttribute;
