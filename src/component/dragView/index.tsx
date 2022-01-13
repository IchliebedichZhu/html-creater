import { Tabs } from 'antd';
import CodeComponent from './code';
import ScreenView, { handleViewItemFunc } from './view';
import './index.scss';
import { DragMenuListData } from '../dragMenu';

export const viewContainerId = 'view_container';

export type TabListData = {
  key: string;
  name: string;
};

type TabComponentParam = {
  item: TabListData;
  viewList: DragMenuListData[];
  handleClick?: handleViewItemFunc;
};

type TabViewParam = {
  viewList?: DragMenuListData[];
  tabMenu?: TabListData[];
  currentKey?: string;
  onTabChange?: (key: string) => void;
  handleClick?: handleViewItemFunc;
};

function HandleTabComponent({
  item,
  viewList,
  handleClick,
}: TabComponentParam) {
  switch (item.key) {
    case viewContainerId:
      return (
        <div className='screen_view_container'>
          <ScreenView
            containerId={item.key}
            viewList={viewList}
            handleClick={handleClick}
          />
        </div>
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
  handleClick = () => {},
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
            <HandleTabComponent
              item={val}
              viewList={viewList}
              handleClick={handleClick}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
