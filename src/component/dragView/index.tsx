import DragComponent from '../dragger';
import { Tabs } from 'antd';
import CodeComponent from './code';
import ScreenView from './view';
import './index.scss';

export type TabListData = {
  key: string;
  name: string;
};

type TabComponentParam = {
  item: TabListData;
};

type TabViewParam = {
  tabMenu?: TabListData[];
  currentKey?: string;
  onTabChange?: (key: string) => void;
};

function HandleTabComponent({ item }: TabComponentParam) {
  switch (item.key) {
    case 'view':
      return (
        <DragComponent>
          <div className='screen_view_container'>
            <ScreenView />
          </div>
        </DragComponent>
      );
    case 'code':
      return <CodeComponent code='<p>hello world</p>' />;
    default:
      return <></>;
  }
}

function DragView({
  tabMenu = [],
  currentKey,
  onTabChange = () => {},
}: TabViewParam) {
  return (
    <div className='view_main'>
      <Tabs
        defaultActiveKey={currentKey}
        onChange={onTabChange}
        tabBarStyle={{ padding: '0 10px' }}
      >
        {tabMenu.map((val) => (
          <Tabs.TabPane key={val.key} tab={val.name}>
            <HandleTabComponent item={val} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
