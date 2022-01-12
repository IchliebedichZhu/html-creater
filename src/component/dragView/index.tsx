import DragComponent from '../dragger';
import { Tabs } from 'antd';
import CodeComponent from './code';
import ScreenView from './view';
import './index.scss';
import { DragMenuListData } from '../dragMenu';
import { useAppDispatch, useAppSelector } from '@/hooks/store';

export const viewContainerId = 'view_container';

export type TabListData = {
  key: string;
  name: string;
};

type TabComponentParam = {
  item: TabListData;
  viewList: DragMenuListData[];
};

type TabViewParam = {
  viewList?: DragMenuListData[];
  tabMenu?: TabListData[];
  currentKey?: string;
  onTabChange?: (key: string) => void;
};

function HandleTabComponent({ item, viewList }: TabComponentParam) {
  switch (item.key) {
    case viewContainerId:
      return (
        <DragComponent>
          <div className='screen_view_container'>
            <ScreenView containerId={item.key} viewList={viewList} />
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
  viewList = [],
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
            <HandleTabComponent item={val} viewList={viewList} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
