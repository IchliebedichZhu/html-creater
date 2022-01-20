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
  focusIndex: number;
  handleClick?: handleViewItemFunc;
  handleViewChange?: HandleViewChangeFunc;
  handleClickScreen?: () => void;
};

type TabViewParam = {
  viewList?: DragMenuListData[];
  tabMenu?: TabListData[];
  currentKey?: string;
  /** 菜单改变事件 */
  onTabChange?: (key: string) => void;
  /** 点击视图层事件 */
  handleClick?: handleViewItemFunc;
  /** 视图渲染完成回调 */
  handleViewChange?: HandleViewChangeFunc;
  /** 点击容器触发事件 */
  handleClickScreen?: () => void;
  /** 当前选中的组件索引值 */
  focusIndex?: number;
};

function HandleTabComponent({
  item,
  viewList,
  focusIndex,
  handleClick,
  handleViewChange,
  handleClickScreen,
}: TabComponentParam) {
  switch (item.key) {
    case viewContainerId:
      return (
        <div className='screen_view_container'>
          <ScreenView
            containerId={item.key}
            viewList={viewList}
            focusIndex={focusIndex}
            handleClick={handleClick}
            handleGetList={handleViewChange}
            handleClickScreen={handleClickScreen}
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
  handleClickScreen = () => {},
  focusIndex = -1,
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
              focusIndex={focusIndex}
              viewList={viewList}
              handleClick={handleClick}
              handleViewChange={handleViewChange}
              handleClickScreen={handleClickScreen}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default DragView;
