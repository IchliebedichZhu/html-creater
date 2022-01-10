import DragComponent from '../dragger';
import { Tabs } from 'antd';
import CodeComponent from './code';

export type TabListData = {
  key: string;
  name: string;
};

type TabComponentParam = {
  item: TabListData;
};

type TabViewParam = {
  list?: TabListData[];
  currentKey?: string;
  onChange?: (key: string) => void;
};

function HandleTabComponent({ item }: TabComponentParam) {
  switch (item.key) {
    case 'view':
      return (
        <DragComponent>
          <p>Hello World</p>
        </DragComponent>
      );
    case 'code':
      return <CodeComponent code='<p>hello world</p>' />;
    default:
      return <></>;
  }
}

function DragView({
  list = [],
  currentKey,
  onChange = () => {},
}: TabViewParam) {
  return (
    <div>
      <Tabs
        defaultActiveKey={currentKey}
        onChange={onChange}
        tabBarStyle={{ padding: '0 10px' }}
      >
        {list.map((val) => (
          <Tabs.TabPane key={val.key} tab={val.name}>
            <HandleTabComponent item={val} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
