import { Tabs } from 'antd';
import CodeComponent from './code';
import ScreenView, { HandleViewChangeFunc, handleViewItemFunc } from './view';
import { DragMenuListData } from '../dragMenu';
import './index.scss';

export const viewContainerId = 'view_container';

export type TabListData = {
  key: string;
  name: string;
};

type TabComponentParam = {
  item: TabListData;
  viewList: DragMenuListData[];
  handleClick?: handleViewItemFunc;
  handleViewChange?: HandleViewChangeFunc;
};

type TabViewParam = {
  viewList?: DragMenuListData[];
  tabMenu?: TabListData[];
  currentKey?: string;
  onTabChange?: (key: string) => void;
  handleClick?: handleViewItemFunc;
  handleViewChange?: HandleViewChangeFunc;
};

function HandleTabComponent({
  item,
  viewList,
  handleClick,
  handleViewChange,
}: TabComponentParam) {
  switch (item.key) {
    case viewContainerId:
      return (
        <div className='screen_view_container'>
          <ScreenView
            containerId={item.key}
            viewList={viewList}
            handleClick={handleClick}
            handleGetList={handleViewChange}
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
  handleViewChange = () => {},
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
              handleViewChange={handleViewChange}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
